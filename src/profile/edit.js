import { renderNavigation, navLinks } from "../nav/nav";

const navigation = document.getElementById('sidebar-navigation')
const navbar = renderNavigation(navLinks)
navigation.appendChild(navbar)