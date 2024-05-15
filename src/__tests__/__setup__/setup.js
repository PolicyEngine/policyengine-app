// import a variety of packages
import { TextEncoder, TextDecoder } from "util";

console.log("does this run once");
// Globalize TextDecoder & TextEncoder
Object.assign(global, { TextDecoder, TextEncoder });
