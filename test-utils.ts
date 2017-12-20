class TestUtils {
}

class TestDescription {
    public text: String
    public injections: any[]
    constructor(text: String, ...injections: Object[]) {
        this.text = text
        this.injections = injections
    }


}