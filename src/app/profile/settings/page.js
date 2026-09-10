"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext'
import { ProfileTabs } from '@/components/ui/profile-tabs'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Card } from '@/components/ui/Card'
import Image from 'next/image'
import { ROUTES_CONSTANTS } from '@/constants/routesConstants'
import Breadcrums from '@/components/ui/Breadcrums'
import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '@/DAL/user'
import { BUSINESS_ID } from '@/config/config'
import { updateUserProfile } from '@/DAL/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { login } from '@/context/UserContext'
import { enqueueSnackbar } from 'notistack'

export default function ProfileSettingsPage() {

const BreadcrumbsItem = [
    { label: "Home", href: ROUTES_CONSTANTS.HOME },
    // { label: "Profile", href: ROUTES_CONSTANTS.PROFILE },
    { label: "Settings", href: ROUTES_CONSTANTS.SETTINGS },
];

  const { user, updateUser } = useUser()
  const queryClient = useQueryClient()

  const {
    data: userProfile,
    // isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProfile", user?.id],
    queryFn: () => getUserProfile(user?.id, BUSINESS_ID),
    enabled: !!user?.id, 
  });

  const userProfileData = userProfile?.data;

// console.log("user",userProfileData)

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    email: '',
    phone: '',
    country: '',
    profilePicture: ''
  })
  const [addresses, setAddresses] = useState([])
  const [editingAddressIndex, setEditingAddressIndex] = useState(null)
  const [newAddress, setNewAddress] = useState({
    addressId: '',
    street: '',
    city: '',
    province: '',
    zipCode: '',
    // isDefault: false
    is_default: false
  })


  useEffect(() => {
    const userData = userProfileData

    setFormData({
      id: userData?.id || '',
      username: userData?.username || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      country: userData?.country || '',
      profilePicture: userData?.profilePicture || '/fallback-watch.jpg'
    })
    
    // Transform backend address data to frontend format
    const transformedAddresses = (userData?.addresses || []).map(address => ({
      addressId: address.addressId || '',
      street: address.street || '',
      city: address.city || '',
      province: address.province || '',
      zipCode: address.zip || address.zipCode || '', 
      is_default: address.defaultAddress || address.is_default || false 
    }))
    
    // console.log("transformedAddresses", transformedAddresses)
    setAddresses(transformedAddresses)
  }, [user, userProfileData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
        setFormData(prev => ({
          ...prev,
          profilePicture: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.province || !newAddress.zipCode) {
      // alert('Please fill in all address fields')
      enqueueSnackbar("Please fill in all address fields", { variant: "error" });
      return
    }

    const addressToAdd = {
      ...newAddress,
      id: Date.now().toString() // Simple ID generation
    }

    // If this is the first address or user wants it as default, make it default
    if (addresses.length === 0 || newAddress.is_default) {
      // Remove default from other addresses
      const updatedAddresses = addresses.map(addr => ({ ...addr, is_default: false }))
      setAddresses([...updatedAddresses, { ...addressToAdd, is_default: true }])
    } else {
      setAddresses([...addresses, addressToAdd])
    }

    // Reset form
    setNewAddress({
      addressId: '',
      street: '',
      city: '',
      province: '',
      zipCode: '',
      is_default: false
    })
  }

  const handleEditAddress = (index) => {
    setEditingAddressIndex(index)
    setNewAddress(addresses[index])
  }

  const handleUpdateAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.province || !newAddress.zipCode) {
      // alert('Please fill in all address fields')
      enqueueSnackbar("Please fill in all address fields", { variant: "error" });
      return
    }

    const updatedAddresses = [...addresses]
    updatedAddresses[editingAddressIndex] = { ...newAddress }

    // If setting as default, remove default from others
    if (newAddress.is_default) {
      updatedAddresses.forEach((addr, index) => {
        if (index !== editingAddressIndex) {
          addr.is_default = false
        }
      })
    }

    setAddresses(updatedAddresses)
    setEditingAddressIndex(null)
    setNewAddress({
      addressId: '',
      street: '',
      city: '',
      province: '',
      zipCode: '',
      is_default: false
    })
  }

  const handleDeleteAddress = (index) => {
    if (addresses.length === 1) {
      alert('You must have at least one billing address')
      return
    }

    const updatedAddresses = addresses.filter((_, i) => i !== index)
    
    // If we deleted the default address, make the first remaining one default
    if (addresses[index].is_default && updatedAddresses.length > 0) {
      updatedAddresses[0].is_default = true
    }

    setAddresses(updatedAddresses)
  }

  const handleSetDefaultAddress = (index) => {
    const updatedAddresses = addresses.map((addr, i) => ({
      ...addr,
      is_default: i === index
    }))
    setAddresses(updatedAddresses)
  }


  const { mutate, isPending , data: updateUserProfileData} = useMutation({
    mutationFn: async (data) => {
      return await updateUserProfile(data);
    },
    onSuccess: async (result) => {
      // Check for success - API might return different response structures
      if (result.statusCode === 200 || result.status === 200 || result.success === true || !result.code) {
        enqueueSnackbar(result.message || "User profile updated successfully!", { variant: "success" });
        queryClient.invalidateQueries({
          queryKey: ["userProfile", user?.id],
        });
        updateUser(result.data)
        setIsEditing(false)
        handleCancel()
      } else {
        enqueueSnackbar(result.message || "Something went wrong", {
          variant: "error",
        });
      }
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "Submission failed", {
        variant: "error",
      });
    },
  });

  const handleSave = async () => {
    try {
      const transformedAddresses = addresses.map(address => ({
        addressId: address.addressId || null,
        userId: user?.id || null,
        country: formData.country || null,
        province: address.province || null,
        city: address.city || null,
        street: address.street || null,
        zip: address.zipCode || null, 
        defaultAddress: address.is_default || false 
      }))
      
      // Update user context with both form data and addresses
      const data = {
        ...formData,
        addresses: transformedAddresses,
        businessId: BUSINESS_ID
      }

      mutate(data)

    } catch (error) {
      console.error('Error updating profile:', error)
      // alert('An error occurred while updating your profile.')
    }
  }

  const handleCancel = () => {

    const userData = userProfileData

    setFormData({
      id: userData.id || '',
      username: userData.username || '',
      email: userData.email || '',
      phone: userData.phone || '',
      country: userData.country || '',
      profilePicture: userData.profilePicture || '/fallback-watch.jpg'
    })
    
    // Transform backend address data to frontend format
    const transformedAddresses = (userData?.addresses || []).map(address => ({
      addressId: address.addressId || '',
      street: address.street || '',
      city: address.city || '',
      province: address.province || '',
      zipCode: address.zip || address.zipCode || '', // Backend sends 'zip', frontend expects 'zipCode'
      is_default: address.defaultAddress || address.is_default || false // Backend sends 'defaultAddress', frontend expects 'is_default'
    }))
    
    setAddresses(transformedAddresses)
    setProfileImage(null)
    setEditingAddressIndex(null)
    setNewAddress({
      addressId: '',
      street: '',
      city: '',
      province: '',
      zipCode: '',
      is_default: false
    })
    setIsEditing(false)
  }

  return (
    <section className="w-full mx-auto pt-40 py-20 px-6 flex flex-col items-center gap-10 font-poppins">
      {/* Page Header */}
      <div className="w-full py-5 px-10 flex flex-col items-center">
        <h1 className="text-5xl text-center font-medium text-black">Profile Settings</h1>
        <Breadcrums BreadcrumbsItem={BreadcrumbsItem} />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl">
        {/* Profile Tabs */}
        <div className="mb-8 flex justify-center">
          <ProfileTabs active="settings" />
        </div>

        {/* Profile Settings Card */}
        <Card className="p-8">
          <div className="space-y-8">
            {/* Profile Picture Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                  <Image
                    src={profileImage || formData.profilePicture || '/fallback-watch.jpg'}
                    alt="Profile Picture"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-brand text-white rounded-full p-2 cursor-pointer hover:bg-brand/90 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                <p className="text-gray-600 mt-1">
                  {isEditing 
                    ? "Click the camera icon to upload a new profile picture" 
                    : "Your profile picture is displayed across your account"
                  }
                </p>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <p className="text-gray-600 mt-1">Update your personal details</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="username">Full Name</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label htmlFor="country">Country / Region</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your country"
                  />
                </div>
              </div>
            </div>

            {/* Billing Addresses Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">Shipping Addresses</h3>
                <p className="text-gray-600 mt-1">Manage your shipping addresses</p>
              </div>

              {/* Existing Addresses */}
              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <div key={address.addressId} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">
                          Address {index + 1}
                        </h4>
                        {address.is_default && (
                          <span className="bg-brand text-white text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      {isEditing && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditAddress(index)}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            Edit
                          </Button>
                          {!address.is_default && (
                            <Button
                              onClick={() => handleSetDefaultAddress(index)}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              Set Default
                            </Button>
                          )}
                          {addresses.length > 1 && (
                            <Button
                              onClick={() => handleDeleteAddress(index)}
                              variant="outline"
                              size="sm"
                              className="text-xs text-red-600 hover:text-red-700"
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-700">
                      <p className="font-medium">{address.street}</p>
                      <p>{address.city}, {address.province} {address.zipCode}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Address Form */}
              {isEditing && (
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <h4 className="font-medium text-gray-900 mb-4">
                    {editingAddressIndex !== null ? 'Edit Address' : 'Add New Address'}
                  </h4>
                  
                  <div className="space-y-4">
                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="newAddress">Shipping Address</Label>
                      <Input
                        id="newAddress"
                        name="street"
                        value={newAddress.street}
                        onChange={handleAddressChange}
                        placeholder="Enter your shipping address"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* City */}
                      <div className="space-y-2">
                        <Label htmlFor="newCity">Town / City</Label>
                        <Input
                          id="newCity"
                          name="city"
                          value={newAddress.city}
                          onChange={handleAddressChange}
                          placeholder="Enter your city"
                        />
                      </div>

                      {/* Province */}
                      <div className="space-y-2">
                        <Label htmlFor="newProvince">Province / State</Label>
                        <Input
                          id="newProvince"
                          name="province"
                          value={newAddress.province}
                          onChange={handleAddressChange}
                          placeholder="Enter your province"
                        />
                      </div>

                      {/* ZIP Code */}
                      <div className="space-y-2">
                        <Label htmlFor="newZipCode">ZIP / Postal Code</Label>
                        <Input
                          id="newZipCode"
                          name="zipCode"
                          value={newAddress.zipCode}
                          onChange={handleAddressChange}
                          placeholder="Enter your ZIP code"
                        />
                      </div>
                    </div>

                    {/* Default Address Checkbox */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is_default"
                        name="is_default"
                        checked={newAddress.is_default}
                        onChange={(e) => setNewAddress(prev => ({ ...prev, is_default: e.target.checked }))}
                        className="rounded border-gray-300 text-brand focus:ring-brand"
                      />
                      <Label htmlFor="is_default" className="text-sm">
                        Set as default address
                      </Label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={editingAddressIndex !== null ? handleUpdateAddress : handleAddAddress}
                        className="bg-brand hover:bg-brand/90 text-white px-4 py-2"
                      >
                        {editingAddressIndex !== null ? 'Update Address' : 'Add Address'}
                      </Button>
                      {editingAddressIndex !== null && (
                        <Button
                          onClick={() => {
                            setEditingAddressIndex(null)
                            setNewAddress({
                              addressId: '',
                              street: '',
                              city: '',
                              province: '',
                              zipCode: '',
                              is_default: false
                            })
                          }}
                          variant="outline"
                          className="px-4 py-2"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Add More Address Button */}
              {isEditing && editingAddressIndex === null && (
                <div className="text-center">
                  <Button
                    onClick={() => {
                      setNewAddress({
                        addressId: '',
                        street: '',
                        city: '',
                        province: '',
                        zipCode: '',
                        is_default: false
                      })
                    }}
                    variant="outline"
                    className="border-dashed border-2 border-gray-300 hover:border-brand hover:text-brand px-6 py-3"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add More Address
                  </Button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-brand hover:bg-brand/90 text-white px-6 py-2"
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-brand hover:bg-brand/90 text-white px-6 py-2"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button 
                    onClick={handleCancel}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
