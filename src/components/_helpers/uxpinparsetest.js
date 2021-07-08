/**
 * Use this file for testing the UXPinParser utilities
 */

const keyLink = 'link';
const keyText = 'text';
const keyIcon = 'icon';
const keyRow = 'row';
const keyBlock = 'block';



//For test results, model on the nav1Test.
const tableHeadersTest1 = `Column A, Column B, Column C, Column D, Tokens, Actions`;


//Results should match tableHeadersTest1
//For test results, model on the nav1Test.
const tableHeadersTest2 = `Column A
Column B
Column C
Column D
Tokens
Actions`;


//Pass 1: Tokenize on line break to get the rows. Returns: Array of Rows.
//Pass 2: CSV parse each row. Returns: Array of 'block' (1 block for each table cell).
//The implementer can parse each block at runtime to get the tokens in it.  
const tableRowsTest =
   `link(Component_Name_A), icon(SkypeCircleCheck|success) Ready, C-1, D-1, Learn More link(Visit|http://uxpin.com) icon(Globe|themePrimary), icon(MoreVertical|themePrimary)
link(Component_Name_B), icon(WarningSolid|warning) Restarting..., C-2, D-2, Learn More link(Visit|http://uxpin.com) icon(Globe|themePrimary), icon(MoreVertical|themePrimary)
link(Component_Name_C), icon(StatusErrorFull|error) Unavailable, C-3, D-3, Learn More link(Visit|http://uxpin.com) icon(Globe|themePrimary), icon(MoreVertical|themePrimary)`;

//This is an example of how the 
const tableRowsTestRow1Result


//For Nav without icons.
const navTest1 = `Home
Products
About Us`;

//CSV parsing yields an arrow of rows. 
//Within each row, an arrow of blocks. 
//Within each block, an array of tokens. 
const navTest1Results =
   [{
      order: 0,
      type: keyRow,
      blocks: [
         {
            order: 0,
            type: keyBlock,
            tokens: [{ order: 0, type: keyText, text: 'Home', },],
         }
      ],
   },
   {
      order: 1,
      type: keyRow,
      blocks: [
         {
            order: 0,
            type: keyBlock,
            tokens: [{ order: 0, type: keyText, text: 'Products', },],
         }
      ],
   },
   {
      order: 2,
      type: keyRow,
      blocks: [
         {
            order: 0,
            type: keyBlock,
            tokens: [{ order: 0, type: keyText, text: 'About Us', },],
         }
      ],
   },
   ];

//For Nav with icons.
const navTest2 = `icon(Home) Home
icon(ProductVariant) Products
icon(Info) About Us`;

//CSV parsing yields an arrow of rows. 
//Within each row, an arrow of blocks. 
//Within each block, an array of tokens. 
const navTest2Results = [{
   order: 0,
   type: keyRow,
   blocks: [
      {
         order: 0,
         type: keyBlock,
         tokens: [{ order: 0, type: keyIcon, iconName: 'Globe', color: undefined, colorToken: undefined, },
         { order: 1, type: keyText, text: 'Home', },],
      }
   ],
},
{
   order: 1,
   type: keyRow,
   blocks: [
      {
         order: 0,
         type: keyBlock,
         tokens: [{ order: 0, type: keyIcon, iconName: 'ProductVariant', color: undefined, colorToken: undefined, },
         { order: 1, type: keyText, text: 'Products', },],
      }
   ],
},
{
   order: 2,
   type: keyRow,
   blocks: [
      {
         order: 0,
         type: keyBlock,
         tokens: [{ order: 0, type: keyIcon, iconName: 'Info', color: undefined, colorToken: undefined, },
         { order: 1, type: keyText, text: 'About Us', },],
      }
   ],
},];


//This is an example of what could be in a single Text control, or in an ActivityItem's Description prop. 
//Also, equivalent to a single cell (or block) of a DataTable. 
const blockTest1 = `Tahlia ran a new system test. link(More Info|http://www.uxpin.com) icon(Info|themePrimary) And it passed!`;

const blockTest1ResultsAlt1 = [{
   order: 0,
   type: keyRow,
   blocks: [
      {
         order: 0,
         type: keyBlock,
         tokens: [
            { order: 0, type: keyText, text: 'Tahlia ran a new system test.', },
            { order: 1, type: keyLink, text: "More Info", href: 'http://www.uxpin.com', },
            { order: 2, type: keyIcon, iconName: 'Info', color: '#0078d4', colorToken: 'themePrimary', },
            { order: 3, type: keyText, text: 'And it passed!', },],
      }
   ],
},];

//This is a potentially valid alternative way to deliver the results.
//Just a simple list of tokens. 
const blockTest1ResultsAlt2 = [
   { order: 0, type: keyText, text: 'Tahlia ran a new system test.', },
   { order: 1, type: keyLink, text: "More Info", href: 'http://www.uxpin.com', },
   { order: 2, type: keyIcon, iconName: 'Info', color: '#0078d4', colorToken: 'themePrimary', },
   { order: 3, type: keyText, text: 'And it passed!', },
];


//** TESTING INDIVIDUAL TOKENS    */

//With fully qualified HREF
const linkTest1 = 'link(Visit UXPin|http://www.uxpin.com)';
const linkTest1Result = {
   order: 0,
   type: keyLink,
   text: "Visit UXPin",
   href: 'http://www.uxpin.com',
};

//With HREF lacking http part. Also, testing trimming.
const linkTest2 = 'link( Visit UXPin | www.uxpin.com )';
const linkTest2Result = {
   order: 0,
   type: keyLink,
   text: "Visit UXPin",
   href: 'http://www.uxpin.com', //Normalized
};

//No HREF
const linkTest3 = 'link(Visit UXPin)';
const linkTest3Result = {
   order: 0,
   type: keyLink,
   text: "Visit UXPin",
   href: '',
};

//With HREF - mailto
const linkTest4 = 'link(Contact Us|mailto:support@uxpin.com)';
const linkTest4Result = {
   order: 0,
   type: keyLink,
   text: "Contact Us",
   href: 'mailto:support@uxpin.com',
};

//with Fluent token
const iconTest1 = 'icon(Globe|themePrimary)';
const icontTest1Result = {
   order: 0,
   type: keyIcon,
   iconName: 'Globe', //trimmed. otherwise, as entered.
   color: '#0078d4',  //using UxpColors.getHexFromHexOrToken()
   colorToken: 'themePrimary', //as entered, not corrected
};

//with hex with hash mark
const iconTest2 = 'icon(Globe|#0078d4)';
const icontTest2Result = {
   order: 0,
   type: keyIcon,
   iconName: 'Globe',
   color: '#0078d4',
   colorToken: '#0078d4',
};

//with hex with no hash mark. 
const iconTest3 = 'icon(Globe|0078d4)';
const icontTest3Result = {
   order: 0,
   type: keyIcon,
   iconName: 'Globe',
   color: '#0078d4',
   colorToken: '0078d4',
};

//No color
const iconTest4 = 'icon(Globe)';
const icontTest4Result = {
   order: 0,
   type: keyIcon,
   iconName: 'Globe',
   color: undefined,
   colorToken: undefined,
};

//With the pipe delimiter, but no color spec
const iconTest5 = 'icon(Globe|)';
const icontTest5Result = {
   order: 0,
   type: keyIcon,
   iconName: 'Globe',
   color: undefined,
   colorToken: undefined,
};

//Testing Trimming
const iconTest6 = 'icon( Globe | #0078d4 )';
const icontTest6Result = {
   order: 0,
   type: keyIcon,
   iconName: 'Globe',
   color: '#0078d4',
   colorToken: '#0078d4',
};

//Plain text
const textTest1 = 'Apples and Grapes';
const textTest1Result = {
   order: 0,
   type: keyText,
   text: 'Apples and Grapes',
};

//Plain text. Testing the trimming
const textTest2 = '  Apples and Grapes  ';
const textTest2Result = {
   order: 0,
   type: keyText,
   text: 'Apples and Grapes',
};

//CSV-parseed text escaped because it has a comma in it
const textTest3 = `"I love you, Grapes!"`;;
const textTest3Result = {
   order: 0,
   type: keyText,
   text: 'I love you, Grapes!',
};

//CSV-parsed text with comma in it, no escaping
const textTest4 = 'I love you, Grapes!';;
const textTest4Result = [{
   order: 0,
   type: keyText,
   text: 'I love you',
},
{
   order: 1,
   type: keyText,
   text: 'Grapes!',
}];