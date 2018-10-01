using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicatioNError(this HttpResponse response, string message)
        {
            // This adds the error message to the response
            response.Headers.Add("Application-Error", message);

            // These to Headers handle the Cors security framework, so there is no error in the console tab
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    }
}