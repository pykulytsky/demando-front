<template>
  <div class="profile">
    <div class="profile-header">
      <div
        :class="$mq !== 'mobile' ? 'profile-cover' : 'profile-cover-small'"
        v-rellax="{
          speed: 5,
        }"
      >
        <vs-avatar
          v-rellax="{
            speed: 10,
          }"
          :size="$mq !== 'mobile' ? '200' : '100'"
          id="profile-avatar"
        >
          <img src="../assets/alex-starnes-PK_t0Lrh7MM-unsplash.jpg" alt="" />
        </vs-avatar>
        <div class="user-info">
          <unicon
            @click="editProfileDialog = true"
            class="edit-btn"
            name="pen"
            height="25"
            width="25"
          />
          <h1 v-if="user.first_name">
            {{ user.first_name }} {{ user.last_name }}
          </h1>
          <h1>@{{ user.username }}</h1>
          <h3>
            {{ user.email }}
          </h3>
        </div>
      </div>
    </div>
    <h1 v-view="badgeHandler" class="profile-caption">Created by</h1>
    <div
      class="badges"
      v-if="participatedIsVisible"
      v-rellax="{
        speed: 2,
      }"
      data-rellax-percentage="0.5"
    >
      <transition name="slide-fade">
        <profile-badge
          :count="user.polls.length"
          :title="'Polls'"
          :icon="'align-left'"
          @complete="onComplete"
        />
      </transition>
      <transition name="slide-fade">
        <profile-badge
          v-if="showQuizzes"
          :count="user.quizzes.length"
          :title="'Quizzes'"
          :icon="'game-structure'"
          @complete="onComplete"
        />
      </transition>

      <transition name="slide-fade">
        <profile-badge
          v-if="showEvents"
          :count="user.events.length"
          :title="'Q&A'"
          :icon="'question'"
          @complete="onComplete"
        />
      </transition>
    </div>
    <h1 v-view="badge1Handler" class="profile-caption">Participated in</h1>
    <div
      v-if="participatedIsVisible2"
      v-rellax="{
        speed: 2,
      }"
      data-rellax-percentage="0.5"
      class="badges"
    >
      <transition name="slide-fade">
        <profile-badge
          :count="user.votes.length"
          :title="'Votes'"
          :icon="'align-left'"
          @complete="onComplete"
        />
      </transition>

      <transition name="slide-fade">
        <profile-badge
          v-if="showAnswers"
          :count="user.answers.length"
          :title="'Answers'"
          :icon="'game-structure'"
          @complete="onComplete"
        />
      </transition>

      <transition name="slide-fade">
        <profile-badge
          v-if="showQuestions"
          :count="user.questions.length"
          :title="'Questions'"
          :icon="'question'"
        />
      </transition>
    </div>

    <vs-dialog not-close blur prevent-close v-model="editProfileDialog">
      <template #header>
        <h4 class="not-margin">Edit your profile</h4>
      </template>

      <div class="con-content">
        <vs-input v-model="username" label-placeholder="Username"></vs-input>
        <vs-input v-model="firstName" label-placeholder="Name"></vs-input>
        <vs-input v-model="lastName" label-placeholder="Surname"></vs-input>
        <vs-row justify="center" align="center">
          <vs-col w="6">
            <vs-input
              v-model="age"
              type="number"
              label-placeholder="Age"
            ></vs-input>
          </vs-col>
          <vs-col w="6">
            <vs-select filter placeholder="Country" v-model="country">
              <vs-option v-for="c in countries" :label="c" :key="c" :value="c">
                {{ c }}
              </vs-option>
            </vs-select>
          </vs-col>
        </vs-row>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="editProfile" transparent> Ok </vs-button>
          <vs-button @click="editProfileDialog = false" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
import ProfileBadge from "../components/profile/ProfileBadge.vue";
import { getMe } from "../api/auth.api";
export default {
  components: {
    ProfileBadge,
  },
  data: () => {
    return {
      user: null,
      participatedIsVisible: false,
      participatedIsVisible2: false,

      showQuizzes: false,
      showEvents: false,
      showAnswers: false,
      showQuestions: false,

      editProfileDialog: false,

      username: "",
      firstName: "",
      lastName: "",
      age: 0,
      country: "",
      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands",
      ],
    };
  },
  methods: {
    badgeHandler(e) {
      if (e.percentCenter < 0.7) {
        this.participatedIsVisible = true;
      }
    },
    badge1Handler(e) {
      if (e.percentCenter < 0.5) {
        this.participatedIsVisible2 = true;
      }
    },
    onComplete(step) {
      if (step == "Polls") {
        this.showQuizzes = true;
      }
      if (step == "Quizzes") {
        this.showEvents = true;
      }
      if (step == "Votes") {
        this.showAnswers = true;
      }
      if (step == "Answers") {
        this.showQuestions = true;
      }
    },
    editProfile() {
      this.editProfileDialog = false;
    },
  },
  created() {
    getMe().then((response) => {
      this.user = response.data;
    });
  },
};
</script>
<style>
.profile-cover {
  height: 50vh;
  width: 100vw;
  background: url("../assets/brett-jordan--qUp3bejuzs-unsplash.jpg");
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-size: cover;
}
.profile-cover-small {
  height: 50vh;
  width: 100vw;
  background: url("../assets/brett-jordan--qUp3bejuzs-unsplash.jpg");
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-size: cover;
  flex-direction: column;
}
#profile-avatar {
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.badges {
  padding: 5%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 25vh;
}
.badges-small {
  padding: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.profile-caption {
  text-align: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.user-info {
  padding: 5% 10%;
  border-radius: 15px;
  backdrop-filter: blur(20px);

  color: #3d4852;
}
.user-info .unicon {
  position: absolute;
  right: 5%;
  top: 5%;
}
.user-info .unicon:hover {
  cursor: pointer;
}
</style>
