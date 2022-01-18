<template>
    <div class="question-item">
        <vs-row justify="space-between">
            <vs-col w="2">
                <unicon name="user" height="15" width="18" fill="royalblue" />
                <i>{{ question.author.username }}</i>
            </vs-col>
            <vs-col w="2">
                <unicon name="calender" :fill="iconColor" />
                {{question.created}} {{measureOfTime}} ago
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
            measureOfTime: 'second'
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
        },

        parseTime() {
            let diffInSeconds = Math.round((new Date() - new Date(this.question.created)) / 1000)

            if(diffInSeconds < 60) {
                this.question.created = diffInSeconds
                this.measureOfTime = 'second'
            }
            else if(diffInSeconds >=60 && diffInSeconds < 3600) {
                this.question.created = Math.round(diffInSeconds / 60)
                this.measureOfTime = 'minute'
            }
            else if (diffInSeconds >= 3600 && diffInSeconds < (3600 * 24)) {
                this.question.created = Math.round(diffInSeconds / 3600)
                this.measureOfTime = 'hour'
            }
            else {
                this.question.created = Math.round(diffInSeconds / (3600 * 24))
                this.measureOfTime = 'day'
            }

            if(this.question.created > 1) {
                this.measureOfTime += 's'
            }
        }
    },

    created() {
        this.parseTime()
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
    border: 2px royalblue solid;
}

.question-item i {
    color: royalblue;
}
</style>
