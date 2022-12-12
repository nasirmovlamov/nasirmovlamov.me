import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  az: {
    translation: {
      home: 'Ana səhifə',
      about: 'Haqqımda',
      dashboard: 'Statistika',
      dashboardInfo:
        'Bu mənim şəxsi hesablarımdan toplanan statistikamdır. Bu statistikada YouTube, GitHub və s. platformalarında müxtəlif ölçülər izləyirəm.',
      blog: 'Bloq',
      blogInfo: 'Öyrənən zaman zövq aldığım hər şey',
      myName: 'Nasir Mövlamov',
      myJob: 'Proqram təminatı mühəndisi üzrə mütəxəssis',
      myEnthusiasm: 'fizika və döyüş sənətləri həvəskarı.',
      hobby: 'js, ts, linux, react, open source və s. öyrənmək / söhbətləşmək.',
      loading: 'Yüklənir...',
      playing: 'Oynanır',
      spotifyPaused: 'Musiqi dayandırıldı',
      currentlyNotListening: 'Hal-hazırda musiqi dinləmir',
      goLatests: 'sonunculara keç',
      recentlyPlayed: 'Sonuncu dinlənilənlər',
      links: 'Linklər',
      jobTitle: 'İş haqqında',
      education: 'Təhsil',
      educationInfo:
        "2022-ci ildə ADNSU-da bakalavr üzrə 'Kompüter mühəndisliyi' təhsilini tamamladım. 2022-ci ildən başlayaraq ADNSU-da  'Süni İntellekt' üzrə təhsilimi davam edirəm.",
      ytSubscribers: 'Youtube Abunələr',
      ytViews: 'Youtube Baxışlar',
      ytWatchTime: 'Youtube İzləmə müddəti',
      hour: 'saat',
      thousand: 'min',
      comingSoon: 'Tezliklə',
    },
  },
  en: {
    translation: {
      home: 'Home',
      about: 'About me',
      dashboard: 'Dashboard',
      dashboardInfo:
        'This is my personal dashboard. I use this dashboard to track various metrics across platforms like YouTube, GitHub, and more.',
      blog: 'Blog',
      blogInfo: 'Everything I enjoyed during learning',
      myName: 'Nasir Movlamov',
      myJob: 'Software engineer at ABB',
      myEnthusiasm: 'physics and martial arts enthusiast.',
      hobby: 'learning / talking about js, ts, linux, react, open source etc.',
      loading: 'Loading...',
      playing: 'Playing',
      spotifyPaused: 'Music paused',
      currentlyNotListening: 'Currently not listening',
      goLatests: 'go recently',
      recentlyPlayed: 'Recently played',
      links: 'Links',
      jobTitle: 'Job title',
      education: 'Education',
      educationInfo:
        'I have graduated from ASOIU with a BS in Computer Engineering in 2022. I am studying a MS in Artificial Intelligence at ASOIU starting from 2022',
      ytSubscribers: 'Youtube Subscribers',
      ytViews: 'Youtube Views',
      ytWatchTime: 'Youtube Watch Time',
      hour: 'hour',
      thousand: 'k',
      comingSoon: 'Coming soon',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
