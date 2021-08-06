import { UxpPersonaData } from '../_helpers/uxppersonadata';



export const UxpImageUtils = {

   /**
    * The UXPin logo, black filled style
    */
   uxpinLogoBlack: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/uxpin_logo_black.png",

   /**
    * The UXPin logo, white filled style
    */
   uxpinLogoWhite: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/uxpin_logo_white.png",

   /**
    * Unsplash: https://unsplash.com/photos/1kf69eE7VR4
    */
   goldenGateBridge: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/golden_gate_bridge.jpg",

   /**
    * Open Street Map: https://www.openstreetmap.org/
    */
   mapsf: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/map_sf.jpg",

   /**
    * Open Street Map: https://www.openstreetmap.org/
    */
   maplondon: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/map_london.jpg",

   /**
    * Courtesy of UXPin
    */
   fpo: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/fpo.png",

   /**
    * Unsplash: https://unsplash.com/photos/nH0MnlVmduk
    */
   dress: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/dress.jpg",

   /**
    * Unsplash: https://unsplash.com/photos/YxbwyTb5ijs
    */
   suit: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/suit.jpg",

   /**
    * Unsplash: https://unsplash.com/photos/jiVeo0i1EB4
    */
   computer: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/computer.jpg",

   /**
    * Unsplash: https://unsplash.com/photos/2l0CWTpcChI
    */
   dog: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/dog.jpg",

   /**
    * Unsplash: https://unsplash.com/photos/YCPkW_r_6uA
    */
   cat: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/cat.jpg",

   /**
   * Unsplash: https://unsplash.com/photos/oNGdR6qb7Bg
   */
   party: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/party.jpg",

   /**
   * Unsplash: https://unsplash.com/photos/IYExyJnvJHw
   */
   cake: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/cake.jpg",

   /**
   * Unsplash: https://unsplash.com/photos/wgivdx9dBdQ
   */
   office: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/office.jpg",

   /**
   * Unsplash: https://unsplash.com/photos/KSfe2Z4REEM
   */
   livingroom: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/livingroom.jpg",

   /**
   * Unsplash: https://unsplash.com/photos/I5b0wNCiDg4
   */
   blurry: "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/blurry.jpg",

   /**
   * Provides a list of all supported image tokens. 
   * @returns {string} An array of strings with the image token names. 
   */
   getImageTokenList: function () {
      let list = [
         "person 1", "persona 1",
         "person 20", "persona 20",
         "map", "sf map",
         "london map",
         "city", "blurry", "sydney",
         "woman", "female",
         "man", "male",
         "dress",
         "suit",
         "computer", "laptop",
         "dog",
         "cat",
         "cake", "unicorn",
         "party",
         "office",
         "home", "living room",
         "logo", "uxpin", "uxpin logo black",
         "uxpin logo white",
         "bridge", "golden gate bridge",
         "fpo"
      ];

      return list;
   },

   /**
   * The user may invoke an image by its token, as indicated
   * @param {string} token The token for an image. 
   * @returns {string} If found, returns a URL string. If not found, returns undefined.
   */
   getImageUrlByToken: function (token) {

      if (token && token.length) {
         let t = token.trim().toLowerCase().replaceAll(" ", "");

         //Let's return common URLs
         if (t.startsWith("http")) {
            return token;
         }

         if (t.startsWith("www")) {
            return "http://" + token;
         }

         if (t.startsWith("person")) {
            let persona = UxpPersonaData.getPersonaByToken(t);
            if (persona) {
               return persona?.imageUrl;
            }
         }

         switch (t) {
            case "fpo":
               return this.fpo;
            case "map":
            case "sf":
            case "sanfrancisco":
            case "sfmap":
               return this.mapsf;
            case "london":
            case "londonmap":
               return this.maplondon;
            case "blurry":
            case "city":
            case "sydney":
               return this.blurry;
            case "woman":
            case "female":
               return UxpPersonaData.personaFemaleUrl;
            case "man":
            case "male":
               return UxpPersonaData.personaMaleUrl;
            case "dress":
               return this.dress;
            case "suit":
               return this.suit;
            case "computer":
            case "laptop":
               return this.computer;
            case "dog":
            case "dogs":
               return this.dog;
            case "cat":
            case "cats":
               return this.cat;
            case "cake":
            case "unicorn":
            case "cupcake":
               return this.cake;
            case "party":
               return this.party;
            case "office":
               return this.office;
            case "livingroom":
            case "home":
               return this.livingroom;
            case "uxpin":
            case "logo":
            case "uxpinlogo":
            case "uxpinlogoblack":
            case "logoblack":
            case "uxpinblack":
            case "blacklogo":
            case "blacklogouxpin":
               return this.uxpinLogoBlack;
            case "uxpinlogowhite":
            case "whitelogo":
            case "logowhite":
            case "uxpinwhite":
            case "whitelogouxpin":
               return this.uxpinLogoWhite;
            case "bridge":
            case "goldengate":
            case "goldengatebridge":
               return this.goldenGateBridge;
            default:
               return undefined;
         }
      }

      return undefined;
   },

};




