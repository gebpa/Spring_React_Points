package lab4pip.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "point")
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Double x;
    private Double y;
    private Double r;
    private String isHitted;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    private Point() {

    }

    public Point(Double x, Double y, Double r) {
        this.x = Math.round(x*1000)/1000d;
        this.y = Math.round(y*1000)/1000d;
        this.r = Math.round(r*1000)/1000d;;
        checkHitted();
    }

    public boolean checkHitted() {
        boolean ret = true;
        if (y > 0 && x > 0)
            if (x*x+y*y>(r/2)*(r/2))
                ret = false;
        if (y>0 && x<0)
            if(x<(-r) || y>r)
                ret=false;
        if (y < 0 && x < 0)
            if (y<-x-r)
                ret = false;
        if (y < 0 && x > 0)
            ret = false;
        if(y==0 && (x<(-r)||x>r/2))
            ret = false;
        if (x==0 && (y>r ||y<(-r)))
            ret = false;
        if (ret)
            isHitted = "true";
        else isHitted = "false";
        return ret;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public String getIsHitted() {
        return isHitted;
    }

    @JsonIgnore
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
