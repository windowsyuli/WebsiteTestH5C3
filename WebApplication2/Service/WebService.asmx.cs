using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace WebApplication2.Service
{
    /// <summary>
    /// WebService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    // [System.Web.Script.Services.ScriptService]
    public class WebService : System.Web.Services.WebService
    {

        [WebMethod]
        public string[] WebSchool()
        {
            return new string[] { "WebSchool" };
        }
        [WebMethod]
        public string[] TypeScript()
        {
            string p1 = "Learning TypeScript";

            string p2 = "TypeScript lets you write JavaScript the way you really want to. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.Any browser. Any host. Any OS. Open Source.";

            string p3 = "TypeScript offers classes, modules, and interfaces to help you build robust components. These features are available at development time for high-confidence application development, but are compiled into simple JavaScript. TypeScript types let you define interfaces between software components and to gain insight into the behavior of existing JavaScript libraries.";

            return new string[] { p1, p2, p3 };
        }
        [WebMethod]
        public string[] Contact()
        {
            string[] p = new string[11];
            p[0] = "Contact";
            p[1] = "Name";
            p[2] = "Michael";
            p[3] = "Email";
            p[4] = "Michael@live.com";
            p[5] = "Your Interests";
            p[6] = "Html5 Css3 Less JavaScript Jquery KnockoutJs TypeScript Others";
            p[7] = "Suggestion";
            p[8] = "WebSchool is good!";
            p[9] = " has been changed to ";
            p[10] = "Submit";
            return p;
        }
    }
}
