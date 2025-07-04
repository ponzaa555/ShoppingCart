{
    // this is log for server
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      // normaly "Microsoft.AspNetCore": "Warning" but for this project we want to see more details
      "Microsoft.AspNetCore": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection":"Data source=ShopingCart.db",
    "Redis":"localhost",
    "IdentityConnection":"Data source=Identity.db"
  },
  "Token":{
    "Key":"supersecretkeysupersecretkeysupersecretkeysupersecretkeysecretkey",
    "Issuer": "https://localhost:7128"
  },
  "ApiUrl": "https://localhost:7153/"
}
