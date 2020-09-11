import React from 'react';
import { Flex, useToast } from '@chakra-ui/core';
import { ProfileCard } from '../../components';
import { useProfileStore } from '../../store';

export const Profile = () => {
  const {
    profiles,
    updateProfile,
    setDefaultProfile,
    deleteProfile
  } = useProfileStore();
  const toast = useToast();

  const handleDeleteProfile = async (profile) => {
    await deleteProfile(profile);
    toast({
      title: `Success`,
      description: `${profile.title} profile is deleted`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };
  return (
    <Flex flexWrap="wrap">
      {profiles.map((profile, index) => (
        <ProfileCard
          profile={profile}
          key={index}
          updateProfile={updateProfile}
          deleteProfile={handleDeleteProfile}
          setDefaultProfile={setDefaultProfile}
        />
      ))}
    </Flex>
  );
};
