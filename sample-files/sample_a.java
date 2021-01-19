public class Main
{
    // used as sample input for validating scenarios when potentially Confusing assignment
    // operator (=) with comparison
    public static void main(String[] args)
    {
        System.out.println("Hello World");
        int i = 0, j, k;
        if (i = 0)
        {
            System.out.println(
                "This always evaluates to true. The above conditional should be identified as a code smell.");
        }

        if (i != 0 || i > 0)
        {
            System.out.println("This is ok");
        }

        if (i == 0 || i = 0)
        {
            System.out.println(
                "This always evaluates to true. The above conditional should be identified as a code smell.");
        }

        if (i = 0 && (i != 0) || (j = 0))
        {
            System.out.println(
                "This always evaluates to true. The above conditional should be identified as a code smell.");
        }
    }
}
