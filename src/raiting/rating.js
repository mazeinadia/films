import Component from '../component';

let dependencies = {};

export class Rating extends Component {

    static get templateService() {
        return dependencies.templateService;
    }

    static set templateService(dependency) {
        dependencies.templateService = dependency;
    }

    constructor() {
        super();
        const root = this.attachShadow({mode: 'open'});
        Rating.templateService.appendTemplateContentToRoot('rating-template', root);
    }
}