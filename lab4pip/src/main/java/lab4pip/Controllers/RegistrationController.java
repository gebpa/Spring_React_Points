package lab4pip.Controllers;

import lab4pip.Entities.User;
import lab4pip.Repositories.UserRepository;
import lab4pip.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class RegistrationController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserService userService;

    @RequestMapping("/createnewuser")
    public String addUser(@RequestParam(value = "username") String username,
                          @RequestParam(value = "password") String password,
                          @RequestParam(value = "repeatpassword") String repeatpassword) {

        User userFromDb = userRepo.findByUsername(username);
        String feedBack="";
        if (userFromDb != null) {
            feedBack+="There is already a user with this email";
        }
        if (repeatpassword.equals(password)){
            feedBack.concat("\nPasswords are not same");
        }
        if (feedBack.length()==0 && username.length()!=0 && password.length()!=0){
            User newUser=new User();
            newUser.setPassword(password);
            newUser.setUsername(username);
            userService.saveUser(newUser);
            feedBack="Success!";
        }
        return feedBack;
    }
}