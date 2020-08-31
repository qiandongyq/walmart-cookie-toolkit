import React from 'react';
import { Flex } from '@chakra-ui/core';
import { ProfileCard } from '../components';
import { useProfileStore } from '../store';

export const FullPageProfileList = () => {
  const {
    profiles,
    updateProfile,
    setDefaultProfile,
    deleteProfile,
  } = useProfileStore();
  return (
    <Flex flexWrap="wrap">
      {profiles.map((profile, index) => (
        <ProfileCard
          profile={profile}
          key={index}
          updateProfile={updateProfile}
          deleteProfile={deleteProfile}
          setDefaultProfile={setDefaultProfile}
        />
      ))}
    </Flex>
  );
};
