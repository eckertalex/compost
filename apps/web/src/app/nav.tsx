import {Button, Icon, IconButton, Tooltip} from '@chakra-ui/react'
import {useMatch, NavLink} from 'react-router-dom'
import {
  LucideProps,
  Home as HomeIcon,
  Settings as SettingsIcon,
} from 'lucide-react'

type NavItemProps = {
  label: string
  icon: (props: LucideProps) => JSX.Element
  to: string
}

export const navItems: NavItemProps[] = [
  {
    label: 'Todos',
    icon: HomeIcon,
    to: '/',
  },
]

export const bottomNavItems: NavItemProps[] = [
  {
    label: 'Settings',
    icon: SettingsIcon,
    to: '/settings',
  },
]

export function NavItem(props: NavItemProps) {
  const {to, label, icon} = props
  const match = useMatch(to)

  return (
    <Button
      as={NavLink}
      to={to}
      width="full"
      colorScheme="gray"
      variant={match ? 'solid' : 'ghost'}
      justifyContent="start"
      fontWeight="normal"
      leftIcon={<Icon as={icon} boxSize={4} color="pink.300" />}
    >
      {label}
    </Button>
  )
}

export function MiniNavItem(props: NavItemProps) {
  const {to, label, icon} = props
  const match = useMatch(to)

  return (
    <Tooltip label={label} hasArrow placement="right">
      <IconButton
        as={NavLink}
        to={to}
        colorScheme="gray"
        variant={match ? 'solid' : 'ghost'}
        aria-label={label}
        icon={<Icon as={icon} boxSize={4} color="pink.300" />}
      />
    </Tooltip>
  )
}
