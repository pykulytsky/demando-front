<template>
  <footer class="footer">

    <!--End mc_embed_signup-->
    <div class="footer__uls">
      <ul v-for="(link, index) in links" :key="index">
        <li class="title">
          {{ link.title }}
        </li>
        <li v-for="(item, i) in link.items" :key="i">
          <a target="_blank" :href="item.link">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>

    <div class="copy">
      <span class="span-copy"> Copyright © 2022</span>
      <span class="span-lusaxweb">
        <span> Created By </span>
        <a target="_blank" href="https://github.com/pykulytsky">Pytkulytsky</a>
      </span>
    </div>
  </footer>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      links: [
        {
          title: "Demando",
          items: [
            {
              text: "What is Demando?",
              link: "/",
            },
            {
              text: "Polls",
              link: "/polls",
            },
            {
              text: "Quizzes",
              link: "/quizzes",
            },
            {
              text: "Q&A Events",
              link: "/qa",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            // {
            //   text: 'Blog',
            //   link: '/'
            // },
            {
              text: "Contribute to frontend",
              link: "https://github.com/pykulytsky/demando-front",
            },
            {
              text: "Contribute to backend",
              link: "https://github.com/pykulytsky/demando",
            },
            {
              text: "Github",
              link: "https://github.com/pykulytsky/",
            },
            {
              text: "Privacy Policy",
              link: "/license/",
            },
          ],
        },
        {
          title: "Help",
          items: [
            {
              text: "Github Issues",
              link: "https://github.com/pykulytsky/demando-front/issues",
            },
            {
              text: "Github Issues(Backend)",
              link: "https://github.com/pykulytsky/demando/issues",
            },

          ],
        },
        {
          title: "Community",
          items: [
            {
              text: "Telegram",
              link: "https://discord.gg/6AZNXEa",
            },
            {
              text: "Github",
              link: "https://github.com/pykulytsky/",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="stylus" scoped>
getColor(colorx, alpha = 1)
    unquote("rgba(var(--vs-"+colorx+"), "+alpha+")")
getVar(var)
    unquote("var(--vs-"+var+")")
.darken
  .subscribe-content
    #mc_embed_signup_scroll
      input
        &[type="email"]
          background getVar(theme-bg) !important
.subscribe-content
  width 100%
  height auto
  overflow hidden
  padding 100px 40px
  display flex
  align-items center
  justify-content center
  flex-direction column
  .con-form
    width 400px
  h4
    padding 0px
    margin 0px
    padding-bottom 15px
    text-align left
    padding-left 10px
    >>>b
      color getColor('primary',1) !important
  #mc_embed_signup_scroll
    display flex
    align-items center
    justify-content center
    input
      padding 14px 20px
      border 0px
      border-radius 17px
      transition all .25s ease
      box-shadow 0px 8px 40px -5px rgba(0,0,0,.09)
      &[type="email"]
        width 400px
        margin-right -30px
        padding-right 30px
        border 2px solid transparent
        padding 14px 20px
        z-index 100
        position relative
        min-width 250px
        background getVar(theme-layout)
        &:focus
          box-shadow 0px 5px 10px 0px rgba(0,0,0,.1)
          transform translate(0,4px)
          ~ .clear
            input
              box-shadow 0px 0px 0px 0px getColor('primary',.6)
              transform translate(0,0px)
      &[type="submit"]
        background getColor('primary')
        color #fff
        box-shadow 0px 10px 20px -10px getColor('primary',.6)
        cursor pointer
        position relative
        z-index 200
        margin-left -85px
        transform translate(0%,-10px)
        &:hover
          box-shadow 0px 10px 20px -10px getColor('primary',.6) !important
          transform translate(0,-5px) !important
.footer
  width 95%
  margin 0px
  margin-top 250px
  display flex
  align-items center
  justify-content center
  flex-direction column
  border-radius 0px 30px 0px 0px
  .footer__uls
    display flex
    align-items flex-start
    justify-content center
  .copy
    position relative
    bottom 0px
    width 100%
    max-width 1000px
    display flex
    align-items center
    justify-content space-between
    font-size .8rem
    padding 20px
    .span-copy
      opacity .5
    .span-lusaxweb
      span
        opacity .5
      a
        opacity .8
        &:hover
          opacity 1
  ul
    padding 30px
    list-style none
    margin 0px
    margin 30px 20px
    .title
      margin-bottom 15px
    li
      font-size 1.1rem
      font-weight bold
      opacity .8
      margin 10px 0px
      a
        font-size .85rem
        opacity .5
        transition all .25s ease
        font-weight normal
        padding 5px
        display block
        &:hover
          opacity 1
          color getColor('primary') !important
@media (max-width: 1200px)
  .footer
    ul
      margin 30px 10px
      padding 15px
@media (max-width: 800px)
  .footer
    .footer__uls
      flex-wrap wrap
    ul
      margin 30px 10px
      padding 15px
      width calc(50% - 20px)
@media (max-width: 600px)
  .footer
    padding-bottom 100px !important
@media (max-width: 500px)
  .footer
    p
    .subscribe-content
      padding 40px 10px
      .con-form
        width 100%
        input[type="email"]
          width calc(100% - 50px) !important
@media (max-width: 400px)
  .footer
    .subscribe-content
      padding 40px 20px
      #mc-embedded-subscribe-form
        display block
        width 100%
      #mc_embed_signup_scroll
        display block
        width 100%
      .con-form
        input[type="email"]
          width 100% !important
          margin-bottom 10px !important
      input
        width 100% !important
        margin-right 0px
        margin-top 10px
        margin-left 0px !important
    ul
      padding  0px 30px
      width calc(100% - 20px)
</style>
