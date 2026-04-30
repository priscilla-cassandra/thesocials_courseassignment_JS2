import { renderNavigation, navLinks } from "../nav/nav.js";
import { logout, isLoggedIn, siteAuthentication } from "../auth/auth.js";

isLoggedIn()
siteAuthentication()

const navigation = document.getElementById('sidebar-navigation')
const navbar = renderNavigation(navLinks)
navigation.appendChild(navbar)