// Confusing 'short circuit' logic operators (&&, ||) with
// boolean logic operators
public class Main
{
  public static void main(String[] args)
  {
    int a,b,c;
    // if a bool is present, we can presume intent was logical, not bitwise
    if((a==0) & (b==0)) {
      System.out.println("")
    }
    if(a<3 | b) {

    }
    while(a==0 && b==4 | c) {

    }
    while(a==0 && b==4) {

    }
    if(a | b) {

    }
    if(a & b) {

    }
    boolean z = a | c;
    int b = a | c;
    int bro;
  }
}
