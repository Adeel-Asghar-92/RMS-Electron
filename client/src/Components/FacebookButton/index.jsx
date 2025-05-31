import React from 'react';
import FacebookIcon from "../../images/facebook.png";
const FacebookLogin = () => {
    // const [fbUser, setFbUser] = useState(null);
    
    // const handleFacebookLogin = () => {
    //   window.FB.login((response) => {
    //     if (response.authResponse) {
    //       setFbUser(response.authResponse);
    //       // Handle successful Facebook login
    //     }
    //   }, { scope: 'public_profile,email' });
    // };
    // useEffect(() => {
    //   const loadFacebookApi = () => {
    //     window.fbAsyncInit = function() {
    //       window.FB.init({
    //         appId: 'YOUR_FACEBOOK_APP_ID',
    //         cookie: true,
    //         xfbml: true,
    //         version: 'v14.0'
    //       });
    //     };
  
    //     (function(d, s, id){
    //        var js, fjs = d.getElementsByTagName(s)[0];
    //        if (d.getElementById(id)) {return;}
    //        js = d.createElement(s); js.id = id;
    //        js.src = "https://connect.facebook.net/en_US/sdk.js";
    //        fjs.parentNode.insertBefore(js, fjs);
    //      }(document, 'script', 'facebook-jssdk'));
    //   };
  
  
    //   loadFacebookApi();
    // }, []);
  
    return (
      <button  className="w-full bg-[#262626]  py-3 rounded-full hover:bg-[#333333] transition duration-300 flex items-center justify-center space-x-2">
      <img src={FacebookIcon} alt="Facebook" size={20} />
      <span>Continue with Facebook</span>
    </button>
    );
  };

  export default FacebookLogin