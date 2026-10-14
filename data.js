/* ============================================================
   MATSCI CLUB: EDIT THIS FILE TO UPDATE THE WEBSITE
   On GitHub: open this file -> pencil icon -> edit -> "Commit changes".
   The live site updates in about 1 minute. Keep the commas and quotes.
   ============================================================ */
window.SITE = {
  name: "MatSci Club",
  tagline: "Innovating Through Materials and Minds",
  intro: "A student-run science education club of the Department of Materials Science and Engineering, University of Rajshahi.",
  founded: 2023,
  email: "matsciofficial@gmail.com",
  facebook: "https://www.facebook.com/matsciclub",
  linkedin: "https://www.linkedin.com/company/matsci-club",
  address: "Jamal Nazrul Islam Academic Building, University of Rajshahi, Rajshahi-6205, Bangladesh",

  /* Top banner. Leave text empty ("") to hide it. */
  notice: { text: "New committee announced: MatSci 2026-27", link: "#team" },

  /* LIVE MODE (optional): change events and posts instantly from a Google Sheet, no GitHub edit needed.
     Publish each sheet tab as CSV (File > Share > Publish to web > CSV) and paste the link here.
     Events columns: date,title,place,desc,form   Blog columns: date,title,author,tag,summary,body (separate paragraphs with ||)
     If a link is "", the lists in this file are used. */
  live: { events: "", blog: "" },

  faq: [
    ["Who can become a member?", "Current and former students of the Department of Materials Science and Engineering, University of Rajshahi."],
    ["How much does membership cost?", "A small monthly subscription of BDT 20 (or BDT 240 for the whole year), as set in the club constitution."],
    ["How do I register for an event?", "Open the Events page and press Register on the event. Registration forms open once the committee publishes them."],
    ["Can I write for the blog?", "Yes. Email your article to the Publication team at the club email address."]
  ],

  /* Membership form (Google Form link). Leave "" to use email instead. */
  joinForm: "",

  about: [
    "MatSci Club is a platform for science learning and research-minded higher education. We bring together students of the Department of Materials Science and Engineering, University of Rajshahi, who care about science and technology.",
    "We build knowledge and skills through workshops, competitions, seminars and outreach, and we connect members with teachers, researchers and alumni in Bangladesh and abroad."
  ],
  membership: "Open to current and former students of the Department of Materials Science and Engineering, University of Rajshahi. Members pay a small monthly subscription (BDT 20 per month, or BDT 240 for the year, as set in the club constitution).",

  programs: [
    ["Workshops and competitions", "Hands-on workshops, quizzes, debates and poster presentations on materials science."],
    ["Research seminars", "Members present published research and learn how to start their own projects."],
    ["School and college outreach", "Talks and workshops that inspire younger students to study science."],
    ["Career and higher study", "Seminars and webinars on scholarships, studying abroad and careers, with senior alumni."],
    ["Mentoring and wellbeing", "Peer support and counselling for students who need help staying on track."],
    ["Alumni and university network", "Links with industry, research groups and materials science departments elsewhere."]
  ],

  /* EVENTS. date = YYYY-MM-DD. Future dates show as Upcoming automatically.
     form = Google Form link for registration ("" = "Registration opens soon"). */
  events: [
    { date: "2026-11-20", title: "Sample: Materials Science Quiz (edit me)", place: "Department seminar room", desc: "Replace this sample with your real event.", form: "" },
    { date: "2026-10-01", title: "Sample: Welcome Seminar (edit me)", place: "Department of MSE, RU", desc: "Past events stay listed here.", form: "" }
  ],

  /* NEWS AND BLOG. One list for both: use tag "News" for announcements, any other tag for articles.
     body = list of paragraphs. */
  blog: [
    { date: "2026-10-14", title: "Committee 2026-27 announced", author: "Media and Publicity team", tag: "News",
      summary: "Meet the new administrative and functional committees.",
      body: ["MatSci Club has announced its administrative and functional committees for 2026-27.", "See the Team page to meet everyone."] },
    { date: "2026-10-14", title: "Welcome to the MatSci Club website", author: "Publication team", tag: "Club news",
      summary: "Our new home for events, registration, news and articles.",
      body: ["This site brings everything about MatSci Club into one place: upcoming events, registration, news and student articles.", "To contribute an article, email us at matsciofficial@gmail.com."] }
  ],

  /* GALLERY: put photos in the img/gallery folder and list them, e.g. ["img/gallery/a.jpg", "Caption"] */
  gallery: [],

  founders: [["img/team/21.jpg", "Md Abdur Rahman", "Founder"], ["img/team/20.jpg", "Saiful Islam", "Co-founder"]],

  /* TEAM 2026-27: [photo, name, role, group] */
  team: [
    ["img/team/03.jpg", "Md Nafiul Islam", "President", "Administrative"],
    ["img/team/02.jpg", "Nusrat Adiba Ruponty", "Vice President", "Administrative"],
    ["img/team/13.jpg", "Ayesha Islam", "Vice President", "Administrative"],
    ["img/team/18.jpg", "Rakibul Islam", "Vice President", "Administrative"],
    ["img/team/14.jpg", "Saiful Islam", "General Secretary", "Administrative"],
    ["img/team/01.jpg", "Omar Faruk", "Assistant General Secretary", "Administrative"],
    ["img/team/19.jpg", "Meherin Khan Moumita", "Assistant General Secretary", "Administrative"],
    ["img/team/07.jpg", "Rejwan Karim Tajim", "Assistant General Secretary", "Administrative"],
    ["img/team/06.jpg", "Susmita Panday Shuvoshree", "Coordinator of Research and Science", "Functional"],
    ["img/team/04.jpg", "Md. Farhan Shahriar", "Deputy Coordinator of Research and Science", "Functional"],
    ["img/team/05.jpg", "Sukhomoy Das", "Coordinator of Documentation", "Functional"],
    ["img/team/15.jpg", "Fabiha Nawshin Satta", "Media and Publicity Manager", "Functional"],
    ["img/team/08.jpg", "Md Mahfuzur Rahman Redwan", "Assistant Media and Publicity Manager", "Functional"],
    ["img/team/10.jpg", "Rezowan Ahmed Tonmoy", "Coordinator of Publication", "Functional"],
    ["img/team/09.jpg", "Md. Abdul Hi Naiem", "Deputy Coordinator of Publication", "Functional"],
    ["img/team/11.jpg", "Md. Anserul Haque Sayem", "Event Manager", "Functional"],
    ["img/team/12.jpg", "Md Asif Islam", "Coordinator of Finance", "Functional"],
    ["img/team/16.jpg", "Md. Shoub Akter", "Coordinator of Higher Education", "Functional"],
    ["img/team/17.jpg", "Azaz Ahmed", "Legal Associate", "Functional"]
  ]
};
