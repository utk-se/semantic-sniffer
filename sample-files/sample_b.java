public class Main
{
    // used as sample input for testing parser vs following scenario
    // Use of == instead of .equals to compare strings.
    public static void main(String[] args)
    {
        String s = "hello";

        if (s == "hello")
        {
            System.out.println("The above conditional should be identified as a code smell.");
        }

        if (s == "hello")
        {
            System.out.println("The above conditional should be identified as a code smell.");
        }
  
        if (s.equals("hello"))
        {
        }
    }
}
