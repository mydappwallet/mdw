export default function() {
  return [
    {
      title: "Crypto Currencies",
      htmlBefore: '<i class="material-icons">&#xE2C7;</i>',
      items: [
        {
          title: "Ethereum",
          to: "/crypto/mainnet"
        },
        {
          title: "Ropsten",
          to: "/crypto/ropsten"
        }
      ]
    },
 {
      title: "Developers",
	  authorize: ['developer'],
      htmlBefore: '<i class="material-icons">view_module</i>',
      items: [
        {
          title: "Applications",
          to: "/apps"
        },
       
      ]
    },
	{
      title: "Settings",
      htmlBefore: '<i class="material-icons">view_day</i>',
      to: "/settings"
    },
   
      {
      title: "User Account",
      htmlBefore: '<i class="material-icons">&#xE8B9;</i>',
      items: [
       {
          title: "User Profile",
          to: "/edit-user-profile"
        },
		{
          title: "Change Password",
          to: "/change-password"
        },
		{
          title: "Change Authenticator",
          to: "/change-authenticator"
        },
        {
		
          title: "Logout",
          to: "#logout",
        },
        
      ]
    },
 {
      title: "Help",
      htmlBefore: '<i class="material-icons">view_day</i>',
      to: "/header-navigation"
    },
   
  ];
}
