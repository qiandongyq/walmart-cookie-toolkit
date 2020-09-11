import React from 'react';
import {
  Box,
  Flex,
  useColorMode,
  Image,
  Stack,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  PseudoBox
} from '@chakra-ui/core';
import { ActionIcon } from './actionIcon';
import { customColor } from '../theme';

const bg_profile_card = { light: 'gray.50', dark: 'gray.700' };
const bg_profile_url = { light: 'gray.200', dark: 'gray.600' };

export const ProfileCard = ({
  profile,
  updateProfile,
  deleteProfile,
  setDefaultProfile
}) => {
  const [showAction, setShowAction] = React.useState(false);
  const { colorMode } = useColorMode();

  const handleChangeProfileName = (title) => {
    updateProfile({ ...profile, title });
  };

  return (
    <PseudoBox
      w={56}
      bg={bg_profile_card[colorMode]}
      rounded="md"
      shadow="md"
      cursor="pointer"
      mt={3}
      mr={4}
      position="relative"
      onMouseEnter={() => setShowAction(true)}
      onMouseLeave={() => setShowAction(false)}
      border={profile.default && '2px'}
      borderColor="teal.200"
      transition="all 300ms"
      _hover={{
        boxShadow: '0 2px 8px rgba(54, 230, 180,0.5)'
      }}
    >
      <Flex overflow="hidden" h={20}>
        <Image
          rounded="full"
          size="30px"
          src={profile.favIconUrl}
          alt={profile.title}
          mt={2}
          ml={2}
        />

        <Box fontSize="md" px={4} py={2} overflow="hidden">
          <Editable
            defaultValue={profile.title}
            isPreviewFocusable={false}
            onSubmit={handleChangeProfileName}
          >
            {({ onRequestEdit }) => (
              <>
                <EditablePreview wordBreak="break-all" />
                <EditableInput />
                {showAction && (
                  <>
                    <Stack
                      isInline
                      spacing={1}
                      position="absolute"
                      top={-18}
                      right={0}
                    >
                      <ActionIcon
                        action={onRequestEdit}
                        iconName="edit"
                        tooltip="Change profile name"
                        rounded="full"
                        p={1}
                        bg={customColor.action_icon_bg[colorMode]}
                      />

                      {profile.default ? (
                        <ActionIcon
                          action={null}
                          iconName="lock"
                          tooltip="This is default profile"
                          rounded="full"
                          p={1}
                          bg={customColor.action_icon_bg[colorMode]}
                        />
                      ) : (
                        <ActionIcon
                          action={() => setDefaultProfile(profile)}
                          iconName="unlock"
                          tooltip="Set as default profile"
                          rounded="full"
                          p={1}
                          bg={customColor.action_icon_bg[colorMode]}
                        />
                      )}
                      <ActionIcon
                        action={() => deleteProfile(profile)}
                        iconName="delete"
                        hover={{ bg: 'red.500' }}
                        tooltip="Delete"
                        rounded="full"
                        p={1}
                        bg={customColor.action_icon_bg[colorMode]}
                      />
                    </Stack>
                  </>
                )}
              </>
            )}
          </Editable>
        </Box>
      </Flex>
      <Box px={3} py={2} roundedBottom="md" bg={bg_profile_url[colorMode]}>
        <Text isTruncated>{profile.url}</Text>
      </Box>
    </PseudoBox>
  );
};
