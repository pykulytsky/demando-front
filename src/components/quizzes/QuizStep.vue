<template>
    <div class="quiz-step">
        <h1>{{step.title}}</h1>
        <vs-row>
            <vs-col w="6">
                <vs-button @click="answer(step.options[0])">
                    {{step.options[0].title}}
                </vs-button>
            </vs-col>
            <vs-col w="6">
                <vs-button @click="answer(step.options[1])">
                    {{step.options[1].title}}
                </vs-button>
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col w="6">
                <vs-button @click="answer(step.options[2])">
                    {{step.options[2].title}}
                </vs-button>
            </vs-col>
            <vs-col w="6">
                <vs-button @click="answer(step.options[3])">

                    {{step.options[3].title}}
                </vs-button>
            </vs-col>
        </vs-row>
    </div>
</template>
<script>
export default {
    props: {
        step: Object
    },
    methods: {
        answer(option) {
            this.$emit('answer', option)
        }
    }
}
</script>
