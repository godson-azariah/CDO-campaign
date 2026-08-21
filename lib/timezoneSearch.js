/**
 * Search keywords for the time zone picker.
 *
 * IANA names zones after one representative city per region — there is no
 * "America/Tampa" or "America/Florida", because the whole state runs on
 * America/New_York. That is correct but useless to type, so every zone below
 * carries the states, cities, countries and abbreviations people actually
 * search for. Lowercase, space separated, matched as substrings.
 */
export const ZONE_KEYWORDS = {
  // ── United States ──
  "America/New_York":
    "eastern time et est edt usa united states connecticut delaware florida georgia maine maryland massachusetts new hampshire new jersey new york north carolina ohio pennsylvania rhode island south carolina vermont virginia west virginia washington dc district of columbia tampa st petersburg miami orlando jacksonville fort lauderdale tallahassee atlanta savannah boston philadelphia pittsburgh charlotte raleigh durham richmond norfolk virginia beach baltimore columbus cleveland cincinnati toledo buffalo rochester newark jersey city providence hartford portland maine",
  "America/Chicago":
    "central time ct cst cdt usa united states illinois texas louisiana alabama mississippi tennessee missouri iowa minnesota wisconsin arkansas oklahoma kansas nebraska north dakota south dakota chicago dallas houston austin san antonio fort worth el paso arlington nashville memphis knoxville milwaukee madison minneapolis saint paul st louis kansas city new orleans baton rouge oklahoma city tulsa omaha lincoln des moines little rock birmingham montgomery mobile jackson wichita",
  "America/Denver":
    "mountain time mt mst mdt usa united states colorado utah wyoming montana new mexico denver colorado springs aurora fort collins salt lake city provo ogden albuquerque santa fe las cruces cheyenne billings missoula bozeman",
  "America/Phoenix":
    "arizona phoenix tucson mesa scottsdale chandler glendale tempe gilbert no daylight saving mst usa united states",
  "America/Los_Angeles":
    "pacific time pt pst pdt usa united states california washington oregon nevada los angeles la san francisco sf san diego san jose sacramento fresno long beach oakland bakersfield anaheim santa ana irvine riverside seattle bellevue tacoma spokane redmond portland oregon salem eugene las vegas reno henderson",
  "America/Boise": "idaho boise idaho falls pocatello mountain time usa",
  "America/Anchorage": "alaska anchorage fairbanks juneau akst akdt usa",
  "Pacific/Honolulu": "hawaii honolulu maui hilo kona hst usa",
  "America/Detroit": "michigan detroit grand rapids ann arbor lansing flint eastern time usa",
  "America/Indianapolis": "indiana indianapolis fort wayne evansville south bend eastern time usa",
  "America/Kentucky/Louisville": "kentucky louisville lexington frankfort eastern time usa",
  "America/Puerto_Rico": "puerto rico san juan ponce ast usa",

  // ── Canada ──
  "America/Toronto": "canada ontario toronto ottawa mississauga hamilton london ontario quebec montreal quebec city eastern time",
  "America/Vancouver": "canada british columbia vancouver victoria surrey burnaby richmond bc pacific time",
  "America/Edmonton": "canada alberta edmonton calgary red deer mountain time",
  "America/Winnipeg": "canada manitoba winnipeg brandon central time",
  "America/Regina": "canada saskatchewan regina saskatoon",
  "America/Halifax": "canada nova scotia halifax new brunswick moncton fredericton prince edward island charlottetown atlantic time",
  "America/St_Johns": "canada newfoundland labrador st johns saint johns",

  // ── India and South Asia ──
  "Asia/Calcutta":
    "india ist indian standard time kolkata calcutta mumbai bombay delhi new delhi noida gurgaon gurugram bengaluru bangalore chennai madras hyderabad secunderabad pune ahmedabad surat jaipur lucknow kanpur nagpur indore bhopal patna vadodara visakhapatnam vizag coimbatore madurai trichy tiruchirappalli kochi cochin ernakulam thiruvananthapuram trivandrum kozhikode calicut thrissur kollam kannur mysore mysuru mangalore chandigarh ludhiana amritsar guwahati bhubaneswar ranchi raipur dehradun goa panaji",
  "Asia/Karachi": "pakistan karachi lahore islamabad rawalpindi faisalabad peshawar multan pkt",
  "Asia/Dhaka": "bangladesh dhaka chittagong chattogram sylhet khulna",
  "Asia/Colombo": "sri lanka colombo kandy galle negombo",
  "Asia/Kathmandu": "nepal kathmandu pokhara",

  // ── United Kingdom and Ireland ──
  "Europe/London":
    "united kingdom uk great britain england scotland wales northern ireland gmt bst london manchester birmingham leeds liverpool sheffield bristol newcastle nottingham leicester coventry brighton cambridge oxford reading southampton portsmouth york glasgow edinburgh aberdeen dundee cardiff swansea belfast derry milton keynes",
  "Europe/Dublin": "ireland republic of ireland dublin cork galway limerick waterford ist irish",

  // ── Europe ──
  "Europe/Stockholm": "sweden stockholm gothenburg goteborg malmo uppsala lund cet",
  "Europe/Oslo": "norway oslo bergen trondheim stavanger cet",
  "Europe/Copenhagen": "denmark copenhagen kobenhavn aarhus odense cet",
  "Europe/Helsinki": "finland helsinki espoo tampere turku oulu eet",
  "Europe/Paris": "france paris lyon marseille toulouse nice nantes strasbourg bordeaux lille cet cest",
  "Europe/Berlin":
    "germany deutschland berlin munich munchen frankfurt hamburg cologne koln stuttgart dusseldorf dortmund essen leipzig bremen dresden hannover nuremberg cet cest",
  "Europe/Madrid": "spain espana madrid barcelona valencia seville sevilla zaragoza malaga bilbao alicante cet",
  "Europe/Rome": "italy italia rome roma milan milano naples napoli turin torino florence firenze venice venezia bologna genoa palermo cet",
  "Europe/Amsterdam": "netherlands holland dutch amsterdam rotterdam the hague den haag utrecht eindhoven cet",
  "Europe/Brussels": "belgium brussels bruxelles antwerp antwerpen ghent gent bruges liege cet",
  "Europe/Zurich": "switzerland zurich geneva geneve basel bern lausanne lucerne cet",
  "Europe/Vienna": "austria vienna wien salzburg graz innsbruck linz cet",
  "Europe/Lisbon": "portugal lisbon lisboa porto braga faro coimbra wet",
  "Europe/Warsaw": "poland polska warsaw warszawa krakow cracow wroclaw poznan gdansk lodz cet",
  "Europe/Prague": "czechia czech republic prague praha brno ostrava cet",
  "Europe/Budapest": "hungary budapest debrecen szeged cet",
  "Europe/Bucharest": "romania bucharest bucuresti cluj timisoara iasi eet",
  "Europe/Athens": "greece athens thessaloniki patras heraklion eet",
  "Europe/Sofia": "bulgaria sofia plovdiv varna eet",
  "Europe/Belgrade": "serbia belgrade beograd novi sad cet",
  "Europe/Zagreb": "croatia zagreb split rijeka dubrovnik cet",
  "Europe/Kiev": "ukraine kyiv kiev kharkiv odesa odessa lviv dnipro eet",
  "Europe/Moscow": "russia moscow moskva saint petersburg st petersburg kazan msk",
  "Europe/Istanbul": "turkey turkiye istanbul ankara izmir bursa antalya trt",
  "Atlantic/Reykjavik": "iceland reykjavik gmt",
  "Europe/Malta": "malta valletta cet",
  "Europe/Luxembourg": "luxembourg cet",

  // ── Middle East ──
  "Asia/Dubai": "uae united arab emirates dubai abu dhabi sharjah ajman gulf gst",
  "Asia/Riyadh": "saudi arabia riyadh jeddah dammam mecca makkah medina khobar ast",
  "Asia/Qatar": "qatar doha ast",
  "Asia/Kuwait": "kuwait kuwait city ast",
  "Asia/Bahrain": "bahrain manama ast",
  "Asia/Muscat": "oman muscat gst",
  "Asia/Jerusalem": "israel jerusalem tel aviv haifa ilst",
  "Asia/Beirut": "lebanon beirut eet",
  "Asia/Amman": "jordan amman eet",
  "Asia/Baghdad": "iraq baghdad basra erbil ast",
  "Asia/Tehran": "iran tehran isfahan mashhad irst",

  // ── Asia Pacific ──
  "Asia/Singapore": "singapore sgt",
  "Asia/Kuala_Lumpur": "malaysia kuala lumpur penang johor bahru ipoh myt",
  "Asia/Jakarta": "indonesia jakarta surabaya bandung medan bali denpasar wib",
  "Asia/Bangkok": "thailand bangkok chiang mai phuket pattaya ict",
  "Asia/Ho_Chi_Minh": "vietnam ho chi minh saigon hanoi da nang haiphong ict",
  "Asia/Manila": "philippines manila quezon city cebu davao makati pht",
  "Asia/Hong_Kong": "hong kong kowloon hkt",
  "Asia/Shanghai":
    "china prc shanghai beijing peking shenzhen guangzhou canton chengdu hangzhou wuhan xian tianjin chongqing nanjing suzhou qingdao cst china standard time",
  "Asia/Taipei": "taiwan taipei kaohsiung taichung tainan hsinchu",
  "Asia/Tokyo": "japan tokyo osaka kyoto yokohama nagoya fukuoka sapporo kobe kawasaki jst",
  "Asia/Seoul": "south korea korea seoul busan incheon daegu daejeon gwangju kst",
  "Australia/Sydney": "australia new south wales nsw sydney canberra act newcastle wollongong aest aedt",
  "Australia/Melbourne": "australia victoria melbourne geelong ballarat aest aedt",
  "Australia/Brisbane": "australia queensland brisbane gold coast sunshine coast cairns townsville aest",
  "Australia/Perth": "australia western australia perth fremantle awst",
  "Australia/Adelaide": "australia south australia adelaide acst acdt",
  "Australia/Hobart": "australia tasmania hobart launceston aest",
  "Australia/Darwin": "australia northern territory darwin alice springs acst",
  "Pacific/Auckland": "new zealand nz auckland wellington christchurch hamilton dunedin nzst nzdt",
  "Pacific/Fiji": "fiji suva nadi",

  // ── Africa ──
  "Africa/Johannesburg": "south africa johannesburg joburg cape town durban pretoria port elizabeth sast",
  "Africa/Lagos": "nigeria lagos abuja kano ibadan port harcourt wat",
  "Africa/Nairobi": "kenya nairobi mombasa kisumu eat",
  "Africa/Cairo": "egypt cairo alexandria giza eet",
  "Africa/Casablanca": "morocco casablanca rabat marrakesh marrakech tangier fez",
  "Africa/Accra": "ghana accra kumasi gmt",
  "Africa/Addis_Ababa": "ethiopia addis ababa eat",
  "Africa/Algiers": "algeria algiers oran cet",
  "Africa/Tunis": "tunisia tunis cet",
  "Africa/Dar_es_Salaam": "tanzania dar es salaam dodoma eat",
  "Africa/Kampala": "uganda kampala eat",
  "Africa/Kigali": "rwanda kigali cat",
  "Africa/Dakar": "senegal dakar gmt",
  "Africa/Abidjan": "ivory coast cote divoire abidjan gmt",

  // ── Latin America ──
  "America/Mexico_City": "mexico mexico city cdmx guadalajara monterrey puebla queretaro leon cst",
  "America/Sao_Paulo": "brazil brasil sao paulo rio de janeiro brasilia belo horizonte porto alegre curitiba salvador recife fortaleza brt",
  "America/Bogota": "colombia bogota medellin cali barranquilla cartagena cot",
  "America/Lima": "peru lima arequipa cusco pet",
  "America/Santiago": "chile santiago valparaiso concepcion clt",
  "America/Argentina/Buenos_Aires": "argentina buenos aires cordoba rosario mendoza art",
  "America/Montevideo": "uruguay montevideo uyt",
  "America/Caracas": "venezuela caracas maracaibo vet",
  "America/Panama": "panama panama city est",
  "America/Costa_Rica": "costa rica san jose heredia cartago alajuela liberia cst",
  "America/Guatemala": "guatemala guatemala city cst",
  "America/El_Salvador": "el salvador san salvador cst",
  "America/Tegucigalpa": "honduras tegucigalpa san pedro sula cst",
  "America/Managua": "nicaragua managua cst",
  "America/Havana": "cuba havana la habana cst",
  "America/Santo_Domingo": "dominican republic santo domingo punta cana ast",
  "America/Jamaica": "jamaica kingston montego bay est",
  "America/Port_of_Spain": "trinidad and tobago port of spain ast",

  // ── Universal ──
  UTC: "utc gmt coordinated universal time zulu z greenwich",
};

/** Substring match across the visible label, the IANA id, and the keywords above. */
export function zoneMatches(zone, query) {
  if (zone.label.toLowerCase().includes(query)) return true;
  if (zone.value.toLowerCase().replace(/_/g, " ").includes(query)) return true;
  const keywords = ZONE_KEYWORDS[zone.value];
  return Boolean(keywords && keywords.includes(query));
}
