// import a variety of packages
import { TextEncoder, TextDecoder } from "util";


// Globalize TextDecoder & TextEncoder
Object.assign(global, { TextDecoder, TextEncoder });
