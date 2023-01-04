import CreateHabit from "../models/createhabit.models.js"
import DropDownMenu from "../models/dropdown.models.js";
import CreateHomepage from "../models/createHomepage.models.js";
import EditProfile from "../models/editProfile.models.js"

CreateHomepage.createContainerTasks()
CreateHomepage.createListTasks()

CreateHomepage.profileHeader()

DropDownMenu.openMenu()
DropDownMenu.logout()
DropDownMenu.editProfile()

CreateHabit.create()

EditProfile.editProfileHabit()