package com.fengshen.user.controller;

import com.fengshen.common.domain.R;
import com.fengshen.user.entity.User;
import com.fengshen.user.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public R<Map<String, Object>> register(@RequestBody RegisterRequest request) {
        User user = userService.register(request.getUsername(), request.getPassword());
        
        Map<String, Object> data = new HashMap<>();
        data.put("userId", user.getId());
        data.put("username", user.getUsername());
        
        return R.ok(data);
    }

    @PostMapping("/login")
    public R<Map<String, Object>> login(@RequestBody LoginRequest request) {
        String token = userService.login(request.getUsername(), request.getPassword());
        
        Map<String, Object> data = new HashMap<>();
        data.put("token", token);
        
        return R.ok(data);
    }

    @GetMapping("/info")
    public R<User> getUserInfo(@RequestAttribute("userId") Long userId) {
        User user = userService.getById(userId);
        user.setPassword(null);
        return R.ok(user);
    }

    @Data
    public static class RegisterRequest {
        private String username;
        private String password;
    }

    @Data
    public static class LoginRequest {
        private String username;
        private String password;
    }
}
