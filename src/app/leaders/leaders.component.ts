import { Component, OnInit } from '@angular/core';
import { CarouselModule,GrowlModule } from 'primeng/primeng';
import { Pipe, PipeTransform } from '@angular/core';
import {MyFilterPipe} from '../myfilter';

@Pipe({
    name: 'myfilter'
})

@Component({
  selector: 'app-leaders',
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.css']
})
export class LeadersComponent implements OnInit {

	HiddenPE: boolean=true;
	HiddenSE: boolean=true;
	HiddenCS: boolean=true;
	items: any;
  candidateMasters: Array<any>;

  pipeFilter = '';
  changeFilterData:any[] = [];
  pipeFilterData:any[] =  [];
    
  jsonData = [
    {key: 0, position: 'Candidate Master Chair', firstName: 'Annie', lastName: 'Chayanupatkul', bio: 'Annie is a junior studying Finance and Management. She is originally from Bangkok, Thailand. Her interests include photography, playing sports, and exploring new places in the city. During her previous summers, she has worked in private wealth management, technology startup, and venture capital.'},
    {key: 1, position: 'Candidate Master', firstName: 'Alexander', lastName: 'Yu', bio: 'Alex is a Junior studying Finance and Statistics with a minor in Computer Science and Mathematics. He is originally from London, UK, but grew up in Shanghai, China. His interests include basketball, good food and drinks. In his previous summer, he interned in Wealth Management.'},
    {key: 2, position: 'Candidate Master', firstName: 'Joelle', lastName: 'Au', bio: 'Joelle is a junior studying Finance and Computing & Data Science. She\'s from Hong Kong and Singapore. Her interests include dancing, spinning, roller coasters and sushi restaurants. During her previous summers, she has worked in marketing and securities services tax. She hopes to work in investment banking next summer.'},
    {key: 3, position: 'Candidate Master ', firstName: 'Slavi', lastName: 'Arnaudov', bio: ''},
    {key: 4, position: 'Community Service Chair', firstName: 'Grace', lastName: 'Muchtar', bio: 'Grace Muchtar is a Junior studying Finance and Information Systems. She was born and bred in Jakarta, Indonesia. Her interests include Reddit, fantasy books and history. This past summer, she was part of the Girls Who Invest program and worked at Global Atlantic Financial Group in their Investments division. '},
    {key: 5, position: 'Community Service Chair', firstName: 'Natasha', lastName: 'Rajiv', bio: 'Natasha is a Junior studying Data Science and Management, with a minor in Digital Art and Design. She is originally from Singapore, and her interests include baking, graphic design, and working out. She has experience working at a tech startup, a private equity firm, and in strategy consulting. She hopes to pursue consulting in the future.'},
    {key: 6, position: 'Community Service', firstName: 'Annie ', lastName: 'Tan', bio: 'Annie Tan is a junior majoring in Finance and Management and minoring in Computer Science. She is originally from Bridgewater, New Jersey, but she went to middle and high school in Shanghai, China. Her interests include car shows, basketball, soccer, sketching, and traveling, whether it\'s to a new country or just upstate for hiking. This summer, she interned for a research start up as a management intern, and she is currently interning at a private equity firm. '},
    {key: 7, position: 'Community Service', firstName: ' Jennifer', lastName: 'Chan', bio: 'Jennifer is a Junior studying Finance and Global Business. She is originally from Hong Kong, but grew up in Beijing, China. Her interests include traveling, fashion, and finding great places to eat at with her friends. This coming summer, she will be joining Barclays for investment banking.  '},
    {key: 8, position: 'Community Service', firstName: 'Karen', lastName: 'Yang', bio: 'I am a Junior studying Finance and Computing and Data Science. My hometown is Seoul, Korea. My interests include traveling, rewatching old movies, and exploring cafes. I have previously worked in accounting, wealth management, and private equity and am looking to seek opportunities in investment banking for the upcoming summer.'},
    {key: 9, position: 'Community Service', firstName: 'Royce', lastName: 'Tjin', bio: 'Royce is a Junior studying finance and data science. He is originally Livingston, NJ. In his free time he enjoys playing soccer, climbing, and overeating. Most recently, he has worked in asset management and he hopes to continue exploring the financial services industry next summer.'},
    {key: 10, position: 'Marketing Chair', firstName: 'Oscar', lastName: 'Xia', bio: 'Growing up on the dark streets of Walnut, California, Oscar likes to spend his time laughing and enjoying the little things in life. This past summer, he worked at HSBC Private Bank. His dream is to open a lobster roll shack.'},
    {key: 11, position: 'Marketing', firstName: 'Josh', lastName: 'Chan', bio: 'Joshua (or just Josh) is a Junior studying Finance and Management. He is originally from New York City, and has stayed here his whole life. His interests include rock climbing, boxing, watches, portrait photography, watching basketball, and watching football. This past summer, he worked at Israel Discount Bank of NY in the Risk Management Division, specifically in market and liquidity risk. '},
    {key: 12, position: 'Marketing', firstName: 'Thalia', lastName: 'Lee', bio: 'Thalia is a Junior concentrating in Finance and Sustainable Business, with a minor in English. She was born and raised on the sunny island of Singapore. In her free time, you can find her with her camera or Kindle, binging Netflix and substituting gym plans with food expeditions. She enjoys exploring new fields and has experience working for a non-profit, a coworking space and an equity crowdfunding platform. She hopes to venture into consulting. '},
    {key: 13, position: 'Marketing', firstName: 'Zoe', lastName: 'Zane', bio: 'Zoë Zane is a Junior studying Finance and Statistics with a minor in Italian. Her hometown is Hong Kong. Her interests include photography, song writing, Netflix, and gym. She worked at BBC Worldwide this spring and at JPMorgan Asset Management during her past summer. '},
    {key: 14, position: 'Mentoring Chair', firstName: 'Jackie', lastName: 'Liu', bio: 'Jackie is a Senior majoring in Finance and Marketing. She was born in China and grew up in Vancouver, Canada. Jackie enjoys watching Korean dramas in her free time, but she is trying to become more active and sign up for ClassPass this semester. During her previous summers, she interned at Chloé, Morgan Stanley and Macquarie. After graduation, she will be joining Macquarie as an investment banking analyst in the Real Estate Group. '},
    {key: 15, position: 'Mentoring', firstName: 'Bryan', lastName: 'Wang', bio: 'Bryan Wang is a Junior studying Finance and Economics. He is originally from Plainview, New York. His interests include Volleyball, Basketball, and Hair cutting. During his previous summers, he has worked in Quant Trading and Investment Banking. He hopes to go into investment banking this summer.'},
    {key: 16, position: 'Mentoring', firstName: 'Cindy', lastName: 'Wei', bio: 'Cindy Wei is a Senior studying Finance and Accounting with a minor in Computer Science. She is originally from Montville, New Jersey. Her interests include Dad jokes, watching superhero movies, and maintaining her dental hygiene! She is graduating in December 2017. During this past summer, she worked at Evercore Advisors (NY M&A) and is returning as a full time analyst. ​'},
    {key: 17, position: 'Mentoring', firstName: 'Joy', lastName: 'Liu', bio: 'Joy Liu is a junior studying Finance and Economics with a minor in Math. She grew up in the suburbs of Chicago and enjoys running, brunching, and doing the NYT Crossword. Other interests include watching good movies with people that know way more about film than she does and reading Agatha Christie murder mysteries. Over the past summer she worked at Discover Financial Services in Chicago, and next summer, she will be joining Credit Suisse in their Global Markets Division.'},
    {key: 18, position: 'Mentoring', firstName: 'Megan', lastName: 'Lee', bio: 'Megan is a Junior studying Finance and Economics. Her hometown is hard to determine, but her current home is Dubai, United Arab Emirates. She is a certified open water diver and likes to go on spontaneous trips. She also likes to eat and make food, go to music festivals and listen to French electro music. She is seeking opportunities in investment banking for next summer.'},
    {key: 19, position: 'Newsletter Chair', firstName: 'Michael', lastName: 'Wang', bio: 'Michael is a Senior studying Finance and Data Science. Originally from Charlotte, North Carolina, he enjoys pop songwriting, watching scary movies, and playing Pokemon Go in his free time. Michael has worked at Google, Jones Lang LaSalle, and Kobalt Music Group, and spent this past summer interning at Citi.'},
    {key: 20, position: 'Newsletter', firstName: 'Patty', lastName: 'Jeon', bio: 'Patty is a senior studying Finance with a double major in Mathematics. She is from Southern California. This summer she was at J.Crew as an allocation intern and will be continuing in the fall as an intern. Previously, she has worked for Barneys New York and Veronica Beard. In her free time, she likes to play cajon, go running, plan trips, and watch golf.'},
    {key: 21, position: 'Newsletter', firstName: 'Stella', lastName: 'Park', bio: 'Stella Park is a Junior studying Finance and Accounting. She was born in S. Korea but lived most of her life in sunny Orange County, CA. Her interests include watching comedy shows, cooking, and going to Broadway shows! This past summer, she worked at Brookfield Asset Management in their office property group. '},
    {key: 22, position: 'Social Chair', firstName: 'Caroline', lastName: 'Wang', bio: 'Caroline is a junior studying Finance and Management with a minor in Japanese. She is originally from Shanghai, China. Her interests include fashion, Pilates, Japanese drama and traveling. This past summer, she interned at Standard Chartered Bank PE department and EY HK advisory department. '},
    {key: 23, position: 'Social', firstName: 'Ryszard', lastName: 'Madej', bio: 'Ryszard Madej is a Senior studying Finance and Economics. He is originally from Long Island. His interests include playing and watching soccer, playing guitar, and traveling. He has prior experience working in equity research and start-ups. This past summer, he interned at Macquarie Capital in the Power, Utilities and Renewables group and he will be joining Evercore full-time. '},
    {key: 24, position: 'Social', firstName: 'Yuni', lastName: 'Sohn', bio: 'Yuni Sohn is a Junior studying Finance and BS/MS Accounting. She is originally from Seoul, South Korea, but mostly grew up in Singapore. Her interests include Two Dots, dance, and watching Friends. During her previous summers, she has worked in management consulting and at a startup as a summer financial analyst. She hopes to go into accounting next summer.'},
    {key: 25, position: 'Speaker Chair', firstName: 'Angela', lastName: 'Sun', bio: 'Angela is a junior studying Finance and Management with a minor in Food Studies. She is originally from Brooklyn, New York and has grown up in the city her entire life. Her interests include anything related to food and cute dogs. Previously, she worked at a boutique investment bank. This summer, she plans to go into investment banking. '},
    {key: 26, position: 'Speaker', firstName: 'Arkin', lastName: 'Khosla', bio: 'Arkin is a Junior studying Finance and Computing and Data Science. He is originally from New Delhi, India. His interests include golf, ping pong, Citi biking, exploring new restaurants and re-watching The Office. He studied abroad in Shanghai and this past summer, he interned at an early-stage venture capital firm. Arkin hopes to pursue an internship in investment banking next summer.'},
    {key: 27, position: 'Speaker', firstName: 'Kaylie', lastName: 'Song', bio: 'Kaylie Song is a Junior studying Finance/Computing and Data Science, with a second major in Language and Mind. She grew up on the island of Singapore, before falling in love with New York. Her interests include aviation, gaming, and convoluted TV shows (White Collar, House of Cards, Burn Notice etc). This past summer, she interned at JP Morgan in the Markets division, as an Equity Derivatives Trading/Electronic Client Solutions intern.'},
    {key: 28, position: 'Speaker', firstName: 'Kylene', lastName: 'Huang', bio: 'Kylene is a junior studying finance and marketing. She originally grew up in Shenzhen, China. Her interests include photography, food and art. This past summer she has worked at a PE firm.'},
    {key: 29, position: 'Special Events Chair', firstName: 'Sindhu', lastName: 'Immidisetty', bio: ''},
    {key: 30, position: 'Special Events', firstName: 'Cassie', lastName: 'Chan', bio: 'Born and raised in NY (though you\'d never expect it), Cassie is a Junior studying Finance and Data Science. Her interests include cheap eats, roller coasters, and travelling. This past summer, she worked at a Fortune 50 oil and gas company on the commercial trading floor. '},
    {key: 31, position: 'Special Events', firstName: 'Kat', lastName: 'Kustas', bio: 'Katherine is a Senior studying Finance and Economics with a minor in Computer Science. She is originally from Long Island, New York. Her interests include playing soccer, hiking, and baking. She has prior experience in accounting and wealth management. This past summer, she interned at Wells Fargo as an Investment Banking Summer Analyst and will be returning full-time.'},
    {key: 32, position: 'Technology Chair', firstName: 'Jennifer', lastName: 'Wang', bio: 'Jennifer Wang is a Junior studying Finance and Computer Science. She is originally from Northern California. Her interests include photography, hiking, and playing the flute. In her previous summers, she has interned as a technology consultant at Accenture and an analyst at BBG Ventures.'},
    {key: 33, position: 'Technology', firstName: ' David', lastName: 'Zuo', bio: 'David is currently a Junior studying Finance and Information Systems. He was from Vancouver and his interests includes computer gaming and trying out different restaurants in the city. He interned at a boutique investment bank freshman year and at a VC this previous summer. He is looking to go into banking, preferably capital markets.'},
    {key: 34, position: 'Technology', firstName: 'Eric', lastName: 'He', bio: 'Born in San Jose, California, Eric He is a Junior studying Math and Statistics. He likes surfing the web and walking with friends. Eric has worked as a machine learning intern for a semiconductor startup and as an analyst for a venture capital firm, and hopes to work as a data scientist in the future.'},
    {key: 35, position: 'Tutoring Chair', firstName: 'SiHeng', lastName: 'Yeo', bio: 'SH Yeo is a senior majoring in Finance & Statistics. He was born and raised in Singapore before coming to Stern for college. His interests include sports (running, soccer, triathlon, hiking), drinking, video gaming, and driving tanks. During his previous summers, he worked at Macquarie IB in New York and a Venture Capital Fund in New York City. He hopes to have a lit senior year.'},
    {key: 36, position: 'Tutoring', firstName: 'Aakriti', lastName: 'Suri', bio: 'Aakriti is a junior studying Finance, Computing and Data Science with a minor in Urban Design. She was born and raised in North India. In her free time she likes to run along the Hudson, explore parks in the city, and hunt for smoothie bars. During her previous summers she has interned with a tech-focused investment bank, development financial institution, and a venture capital firm in New York. '},
    {key: 37, position: 'Tutoring', firstName: 'Edward', lastName: 'Low', bio: 'Edward is a Junior studying Finance and Statistics with a minor in Studio Art. He was born and raised in Singapore. His interests include street photography, travelling, and Japanese food. During his previous internships, Edward has worked in private equity, wealth management, and investment banking. He is interested in pursuing investment banking next summer. '},
    {key: 38, position: 'Tutoring', firstName: 'Haneesh', lastName: 'Anumolu', bio: 'Haneesh is a rising senior studying Finance. He is originally from Orange, CT. This past summer, Haneesh worked at Citi in their Industrials Group as an Investment Banking Analyst.'},
    {key: 39, position: 'VITA Chair', firstName: 'Emily', lastName: 'Shi', bio: 'Emily is a senior studying Finance and Accounting. She is originally from China. She spent the past summer as an audit intern at Deloitte China. '},
    {key: 40, position: 'VITA Chair', firstName: 'Nicco', lastName: 'Liu', bio: ''},
    {key: 41, position: 'VITA', firstName: 'Bonnie', lastName: 'Liu', bio: 'Bonnie Liu is a junior studying BS/MS Accounting and Finance. She is originally from Guangzhou, China but has attended high school in West Chester, Pennsylvania. Her interests include food, food, and food. She also enjoys music(saxophone) and movies. She will be going to EY as an audit intern under Financial Services Organization(FSO) this upcoming summer.'},
    {key: 42, position: 'Workshop Chair', firstName: 'Lia', lastName: 'Wei', bio: 'Lia is a Senior studying Finance and Statistics. Coming from Singapore, she loves exploring different neighborhoods in the city. Her interests include road tripping, watching Broadway shows and doing hot yoga. This summer, she interned in the Investment Banking Division at Goldman Sachs with the Global Industrials Group and will be returning full-time.'},
    {key: 43, position: 'Workshop', firstName: 'Alec', lastName: 'Pan', bio: 'Alec Pan is a Senior studying Finance. He is originally from Basking Ridge, New Jersey. He is an aspiring chef and a BuzzFeed enthusiast. He spent this past summer at Guggenheim Partners doing IB and will be returning as a full-time analyst.'},
    {key: 44, position: 'Workshop', firstName: 'Henry', lastName: 'Wang', bio: 'Henry Wang is a Junior studying Finance and Economics with a minor in Philosophy. He grew up in Northern New Jersey. He is also involved in Greek Life at NYU, and his interests include country music, lifting, and the NY Giants. Last summer he worked as summer analyst at Citigroup in the Retail Investment Banking Group, and he will be returning there for full-time.'},
    {key: 45, position: 'Workshop', firstName: 'Neil', lastName: 'Swami', bio: 'Neil Swami is a senior studying finance and economics. He is originally from Minneapolis, Minnesota. His interests include tennis, hip hop music, and watching Game of Thrones. This summer, he worked in the Leveraged Finance group at J.P. Morgan. '}
  ];

  constructor() {
    this.pipeFilterData = this.jsonData;
  }
  ngOnInit() {
  }

}
