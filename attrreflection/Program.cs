using System;
using System.Collections.Generic;
namespace attrreflection
{
    class Program
    {
        public static void Main(string[] args)
        {
            int a = numeric.printsum(2,3);
            
           //int a = numeric.printsum(new List<int>(){1,2,3});
            Console.WriteLine(a);
        }
        public class numeric
        {
            [ObsoleteAttribute("Use add(List<int> num method)",false)]
            public static int printsum(int a, int b)
            {
                return a + b;
            }
            public static int printsum(List<int> num)
            {
                int sum = 0;
                foreach(int val in num)
                {
                    sum += val;
                }
                return sum;
            }
           
            
        }
    }
}
