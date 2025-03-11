export const linkifyString = (str: string) => {
    const strHasHttpOrHttpsAtStart =
      str.startsWith("http://") || str.startsWith("https://");
  
    if (strHasHttpOrHttpsAtStart) {
      return str;
    } else {
      return `http://${str}`;
    }
  };
  
  export const stringyfyLink = (str: string) => {
    return str.replace("http://", "").replace("https://", "");
  };
  
  export function titleCase(str: string) {
    return str ? str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()) : '';
  }
  
  
  export const NAME_COLOR = {
    A: "#D32F2F", 
    B: "#C2185B", 
    C: "#7B1FA2", 
    D: "#512DA8", 
    E: "#303F9F", 
    F: "#1976D2", 
    G: "#0288D1", 
    H: "#0097A7", 
    I: "#00796B", 
    J: "#388E3C", 
    K: "#689F38", 
    L: "#AFB42B", 
    M: "#FBC02D", 
    N: "#FFA000", 
    O: "#F57C00", 
    P: "#E64A19", 
    Q: "#5D4037", 
    R: "#616161", 
    S: "#455A64", 
    T: "#27261A", 
    U: "#9E9E9E", 
    V: "#21271A", 
    W: "#7C4A4A", 
    X: "#271E1A", 
    Y: "#388E7D", 
    Z: "#1A2727"
  };