import {Fragment} from 'react'
import {
  Text,
  Flex,
  Tooltip,
  IconButton,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import {generatePath, Link} from 'react-router-dom'
import {useLocalStorageState} from 'ahooks'
import {
  ListChecks as ListChecksIcon,
  SidebarClose as SidebarCloseIcon,
  SidebarOpen as SidebarOpenIcon,
} from 'lucide-react'
import {navItems, bottomNavItems, NavItem, MiniNavItem} from './nav'
import {EweIcon} from './ewe'
import {version} from '../../package.json'
import {useLists} from '../features/lists/use-lists'

export function Sidebar() {
  const versionColor = useColorModeValue('gray.200', 'gray.700')
  const bgColorSidebar = useColorModeValue('white', 'gray.900')
  const [isMiniMode, setMiniMode] = useLocalStorageState(
    '__compost_sidebar_mini_mode__',
    {
      defaultValue: false,
    }
  )
  const {data} = useLists()

  const sidebarToggleLabel = isMiniMode ? 'Expand' : 'Collapse'

  return (
    <Flex
      as="nav"
      position="sticky"
      top="0"
      flexDirection="column"
      borderRadius="xl"
      backgroundColor={bgColorSidebar}
      flexShrink={0}
      height="100%"
      padding={4}
      width={isMiniMode ? 16 : 64}
    >
      <HStack justifyContent={isMiniMode ? 'center' : 'start'} as={Link} to="/">
        <EweIcon
          aria-label="Compost"
          boxSize="1.5rem"
          marginLeft={isMiniMode ? undefined : 4}
        />
        {isMiniMode ? null : (
          <Text fontWeight="medium" fontSize="xl">
            Compost
          </Text>
        )}
      </HStack>
      <Divider marginY={4} />
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        height="full"
      >
        <VStack spacing={4} width="full">
          <VStack spacing={2} width="full">
            {navItems.map((item) => (
              <Fragment key={item.to}>
                {isMiniMode ? <MiniNavItem {...item} /> : <NavItem {...item} />}
              </Fragment>
            ))}
          </VStack>
          <Divider marginY={4} />
          <VStack spacing={2} width="full">
            {data?.lists.map((list) => (
              <Fragment key={list.uuid}>
                <NavItem
                  to={generatePath('/lists/:uuid', {uuid: list.uuid})}
                  label={list.displayName}
                  icon={ListChecksIcon}
                />
              </Fragment>
            ))}
          </VStack>
        </VStack>
        <VStack
          alignItems={isMiniMode ? 'center' : 'start'}
          spacing={4}
          w="full"
        >
          <VStack spacing={2} width="full">
            {bottomNavItems.map((item) => (
              <Fragment key={item.to}>
                {isMiniMode ? <MiniNavItem {...item} /> : <NavItem {...item} />}
              </Fragment>
            ))}
          </VStack>
          <Divider marginY={4} />
          <HStack
            justifyContent={isMiniMode ? 'center' : 'space-between'}
            w="full"
          >
            {isMiniMode ? null : (
              <Text color={versionColor} fontSize="sm">
                App Version v{version}
              </Text>
            )}
            <Tooltip label={sidebarToggleLabel} hasArrow placement="right">
              <IconButton
                variant="ghost"
                icon={isMiniMode ? <SidebarOpenIcon /> : <SidebarCloseIcon />}
                aria-label={`${sidebarToggleLabel} sidebar`}
                onClick={() => setMiniMode((s) => !s)}
              />
            </Tooltip>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  )
}
