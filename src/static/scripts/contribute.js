export class Contribute {
    constructor() {
        this.characters = ['de_di', 'pe_pi', 'to_tu', 'p', 'l', 'ra', 'ke_ki', 'lo_lu', 'd', 'po_pu', 'bo_bu', 'ha', 'ye_yi', 'ne_ni', 'n', 'nge_ngi', 'r', 'ng', 'ya', 'ta', 'la', 'w', 'ko_ku', 'da_ra', 'be_bi', 'me_mi', 'sa', 'ba', 'b', 'k', 'ma', 're_ri', 'm', 'nga', 'mo_mu', 't', 'se_si', 'do_du', 'o_u', 'no_nu', 'go_gu', 'he_hi', 'na', 'te_ti', 'le_li', 'ro_ru', 'ga', 'ngo_ngu', 'pa', 'wo_wu', 'wa', 'y', 'a', 'so_su', 'h', 'e_i', 'yo_yu', 'we_wi', 'ge_gi', 'g', 'ka', 'ho_hu', 's']
        this.index = 0

        this.getCharacter();
    }

    getCharacter() {
        // Get the character div
        const character_div = document.getElementById('character');

        if (this.index == this.characters.length) {
            console.log('No more characters to display!');
            character_div.innerHTML = 'Salamat!';

            this.index = 0;
        }

        const parsed_character = this.characters[this.index].replace(/_/g, ', ');
        this.index++;

        character_div.innerHTML = parsed_character;
    }
}