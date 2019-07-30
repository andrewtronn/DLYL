using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using BCrypt.Net;
using System.Net;
using System.IO;
using System.Runtime.Serialization.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net.Http;
using System.Web;
// for class Encoding




namespace back_end.Controllers
{
    static class linkedinRepository
    {
        static private string clientId = Keys.linkedInClientId;
        static private string clientSecret = Keys.linkedInClientSecret;
    }

    [Route("api/linkedin")]
    [ApiController]
    public class OAuthLinkedInController : ControllerBase
    {
        // POST api
        [HttpPost]
        public IActionResult Post([FromBody] string code)
        {
            string str = linkeInApi(code);
            return Ok(str);
        }

        public string linkeInApi(string code)
        {

            string authUrl = "https://www.linkedin.com/uas/oauth2/accessToken";
            var sign = "grant_type=authorization_code&code=" + HttpUtility.HtmlEncode(code) + "&redirect_uri=" + HttpUtility.HtmlEncode("http://localhost:3000/linkedin/") + "&client_id=" + Keys.linkedInClientId + "&client_secret=" + Keys.linkedInClientSecret;

            HttpWebRequest webRequest = WebRequest.Create(authUrl + "?" + sign) as HttpWebRequest;

            webRequest.Method = "POST";
            webRequest.ContentType = "application/x-www-form-urlencoded";
            Stream dataStream = webRequest.GetRequestStream();
            String postData = String.Empty;
            byte[] postArray = Encoding.ASCII.GetBytes(postData);
            dataStream.Write(postArray, 0, postArray.Length);
            dataStream.Close();
            WebResponse response = webRequest.GetResponse();
            dataStream = response.GetResponseStream();
            Console.WriteLine(dataStream);
            StreamReader responseReader = new StreamReader(dataStream);
            String returnVal = responseReader.ReadToEnd().ToString();
            responseReader.Close();
            dataStream.Close();
            response.Close();
            
            return returnVal;
        }

        // public string linkedInGetUserInfo(string code)
        // {
        //     string apiRequest = "https://api.linkedin.com/v2/me";
        // }

        public void SetBasicAuthHeader(WebRequest request, string username, string password)
       {
           string auth = username + ":" + password;
           auth = Convert.ToBase64String(Encoding.Default.GetBytes(auth));
           request.Headers["Authorization"] = "Bearer " + auth;
       }

    }

}
