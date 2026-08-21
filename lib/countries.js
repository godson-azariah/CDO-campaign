// Compact ISO-ish list; kept as a single string to stay easy to edit.
const LIST =
  "Afghanistan|Albania|Algeria|Andorra|Angola|Argentina|Armenia|Australia|Austria|Azerbaijan|" +
  "Bahamas|Bahrain|Bangladesh|Barbados|Belarus|Belgium|Belize|Benin|Bhutan|Bolivia|" +
  "Bosnia and Herzegovina|Botswana|Brazil|Brunei|Bulgaria|Burkina Faso|Burundi|Cambodia|Cameroon|Canada|" +
  "Cape Verde|Chad|Chile|China|Colombia|Costa Rica|Croatia|Cuba|Cyprus|Czechia|" +
  "Denmark|Djibouti|Dominican Republic|Ecuador|Egypt|El Salvador|Estonia|Eswatini|Ethiopia|Fiji|" +
  "Finland|France|Gabon|Gambia|Georgia|Germany|Ghana|Greece|Guatemala|Guinea|" +
  "Guyana|Haiti|Honduras|Hong Kong|Hungary|Iceland|India|Indonesia|Iraq|Ireland|" +
  "Israel|Italy|Ivory Coast|Jamaica|Japan|Jordan|Kazakhstan|Kenya|Kuwait|Kyrgyzstan|" +
  "Laos|Latvia|Lebanon|Lesotho|Liberia|Libya|Liechtenstein|Lithuania|Luxembourg|Madagascar|" +
  "Malawi|Malaysia|Maldives|Mali|Malta|Mauritania|Mauritius|Mexico|Moldova|Monaco|" +
  "Mongolia|Montenegro|Morocco|Mozambique|Myanmar|Namibia|Nepal|Netherlands|New Zealand|Nicaragua|" +
  "Niger|Nigeria|North Macedonia|Norway|Oman|Pakistan|Palestine|Panama|Papua New Guinea|Paraguay|" +
  "Peru|Philippines|Poland|Portugal|Qatar|Romania|Rwanda|Saudi Arabia|Senegal|Serbia|" +
  "Seychelles|Sierra Leone|Singapore|Slovakia|Slovenia|Somalia|South Africa|South Korea|Spain|Sri Lanka|" +
  "Sudan|Suriname|Sweden|Switzerland|Taiwan|Tajikistan|Tanzania|Thailand|Togo|Trinidad and Tobago|" +
  "Tunisia|Turkey|Turkmenistan|Uganda|Ukraine|United Arab Emirates|United Kingdom|United States|Uruguay|Uzbekistan|" +
  "Vanuatu|Vatican City|Venezuela|Vietnam|Yemen|Zambia|Zimbabwe";

// Ignitho's core markets surface first, then the full list A-Z.
export const PRIORITY_COUNTRIES = [
  "United States",
  "United Kingdom",
  "India",
  "Sweden",
  "Costa Rica",
];

export const COUNTRIES = LIST.split("|");
