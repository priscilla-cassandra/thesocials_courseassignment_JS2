import { renderNavigation, navLinks } from "../nav/nav";
import { isLoggedIn, siteAuthentication } from "../auth/auth.js";

isLoggedIn()
siteAuthentication()

const navigation = document.getElementById('sidebar-navigation')
const navbar = renderNavigation(navLinks)
navigation.appendChild(navbar)