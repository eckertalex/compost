import {useRef} from 'react'
import {
  Text,
  VStack,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  HStack,
} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import {Menu as MenuIcon} from 'lucide-react'
import {navItems, NavItem} from './nav'
import {EweIcon} from './ewe'
import {version} from '../../package.json'

export function MobileNav() {
  const borderBottomColor = useColorModeValue('gray.200', 'gray.700')
  const backgroundColor = useColorModeValue('white', 'gray.900')
  const {isOpen, onOpen, onClose} = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)

  return (
    <Flex
      as="nav"
      borderBottomWidth={1}
      borderBottomColor={borderBottomColor}
      backgroundColor={backgroundColor}
      alignItems="center"
      justifyContent="space-between"
      padding={4}
      width="full"
      height={16}
    >
      <IconButton
        ref={btnRef}
        variant="outline"
        icon={<MenuIcon />}
        aria-label="Menu"
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="full"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack as={Link} to="/">
              <EweIcon aria-label="Compost" boxSize="1.5rem" />
              <Text fontWeight="medium" fontSize="xl">
                Compost
              </Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody as={VStack} spacing={4}>
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </DrawerBody>
          <DrawerFooter>
            <Text color={borderBottomColor} fontSize="sm">
              App Version v{version}
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}
