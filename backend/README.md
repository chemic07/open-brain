endpoints

/api/v1/signup
/api/v1/signin
/api/v1/content => add content
/api/v1/content:id => delete content by id
/api/v1/content => fetch all contents
/api/v1/user/stats => get all user related stats
/api/v1/user/profile => update userprifile
/api/v1/user/profile => get user profile
/api/v1/user/change-password => change user's password
/api/v1/user/delete-account => delete user's account
/api/v1/share/generate => gen shareable link
/api/v1/share/toggle => toggle link access
/api/v1/share/:hash => access shared link
/api/v1/ai/search => sementic search
/api/v1/ai/chat => chat with AI
/api/v1/payment/creat-checkout => creat stripe checkout
/api/v1/payment/cancel => cancel subscription

#Todo

1.  add rate limiting
2.  add docker
3.  add monitoring
4.  add github actions
5.  add embeding => done
6.  add route for changing user password => done
7.  add route for update user profile => done
8.  add route for fetching user details => done
9.  add k8n files
10. add passport js
11. refactor payment and search later
