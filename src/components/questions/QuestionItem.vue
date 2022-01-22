<template>
    <div class="question-item">
        <vs-row justify="space-between">
            <vs-col w="2">
                <unicon name="user" height="15" width="18" fill="royalblue" />
                <i>{{ question.author.username }}</i>
            </vs-col>
            <vs-col w="2">
                <unicon name="calender" :fill="iconColor" />
                {{question.created}} ago
            </vs-col>
        </vs-row>
        <vs-row>
            <h2>{{question.body}}</h2>
        </vs-row>
        <vs-row justify="flex-end" align="center">
            <unicon @click="updateLikes(-1)" name="thumbs-down" :fill="iconColor" />
                {{question.likes_count}}
            <unicon @click="updateLikes(1)" name="thumbs-up" :fill="iconColor" />
        </vs-row>


    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {patchQuestion} from '../../api/items/questions.api'

export default {
    props: {
        question: Object
    },
    data: () => {
        return {
        }
    },

    computed: {
        ...mapGetters(['iconColor']),
    },

    methods: {
        async updateLikes(step) {
            await patchQuestion({
                likes_count:  this.question.likes_count + step
            }, this.question.pk)
            this.$emit('updateQuestions')
        },
    }
}
</script>

<style>
.question-item {
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    min-width: 100%;
    max-width: 900px;
    border: 3px royalblue solid;
}

.question-item i {
    color: royalblue;
}

.question-item .unicon:hover {
    cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
