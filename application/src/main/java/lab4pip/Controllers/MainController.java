package lab4pip.Controllers;

import lab4pip.Entities.Point;
import lab4pip.Entities.User;
import lab4pip.Repositories.PointRepository;
import lab4pip.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Set;

@RestController
public class MainController {

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private UserRepository userRepository;


    @RequestMapping("/allpoints")
    public List<Point> allPointOfUser(@AuthenticationPrincipal User user) {
        return user.getPoints();
    }

    @RequestMapping("/addpoint")
    public List<Point> addPoint(@AuthenticationPrincipal User user, @RequestParam(value = "x") String x, @RequestParam(value = "y") String y, @RequestParam(value = "r") String r) {
        double rd = Double.parseDouble(r);
        double xd = Double.parseDouble(x);
        double yd = Double.parseDouble(y);
        Point point = new Point(xd, yd, rd);
        point.setUser(user);
        pointRepository.save(point);
        user.getPoints().add(point);
        for (Point p : user.getPoints()) {
            p.setR(rd);
            p.checkHitted();
            pointRepository.save(p);
        }
        return user.getPoints();
    }

    @RequestMapping("/changeR")
    public List<Point> addPoint(@AuthenticationPrincipal User user, @RequestParam(value = "r") String r) {
        double rd = Double.parseDouble(r);
        for (Point p : user.getPoints()) {
            p.setR(rd);
            p.checkHitted();
            pointRepository.save(p);
        }
        return user.getPoints();
    }
}