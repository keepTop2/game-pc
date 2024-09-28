export module NetEnumDef {
    export enum check_version_result
    {
        cvr_yes = 1,
        cvr_no = 2
    };
    export enum sys_msg_type
    {
        sys_msg_common = 1,
        sys_msg_shop = 2,
        sys_msg_explore = 3
    };
    export enum connect_type
    {
        common_connect = 1,
        re_connect = 2,
        inner_login = 3
    };
    export enum reconnect_result
    {
        reconnect_success = 1,
        reconnect_noregister = 2,
        reconnect_passworderror = 3,
        reconnect_versionerror = 4
    };
    export enum role_status
    {
        online = 1,
        offline = 2
    };
    export enum common_judge
    {
        common_yes = 1,
        common_no = 2
    };
    export enum common_result
    {
        common_success = 1,
        common_failed = 2,
        common_error = 3
    };
    export enum buy_state
    {
        can_buy = 1,
        not_buy = 2
    };
    export enum vip_reward_state
    {
        reward_ready = 1,
        reward_claimed = 2
    };
    export enum bank_password_state
    {
        is_set = 1,
        not_set = 2
    };
    export enum game_type
    {
        game_type_zjh = 1,
        game_type_dn = 2,
        game_type_dot21 = 3,
        game_type_texas = 4,
        game_type_niu100 = 5,
        game_type_bjl = 6,
        game_type_shz = 7,
        game_type_laba = 8,
        game_type_buyu = 9,
        game_type_happy_guagua = 10,
        game_type_odd_monkey = 11,
        game_type_lhdb = 12,
        game_type_bmw = 13,
        game_type_huj5 = 14,
        game_type_zjh100 = 15,
        game_type_jincan = 16,
        game_type_slots_zombie = 17,
        game_type_slots_huj5_2 = 18,
        game_type_slots_fruit_fight = 19,
        game_type_slots_fotune_god = 20,
        game_type_slots_dragon_5 = 21,
        game_type_pt888 = 22,
        game_type_jmp = 23,
        game_type_yiyuan = 24,
        game_type_qtds = 25,
        game_type_slots_whiteBones = 26,
        game_type_dcdf = 27,
        game_type_dragon_knight = 28,
        game_type_milu = 29,
        game_type_jump_high = 30,
        game_type_three_little_pigs = 31,
        game_type_fruit_mali = 32,
        game_type_fqzs = 33,
        game_type_nine_line = 34,
        game_type_milu2 = 35,
        game_type_captain = 36,
        game_type_gfxm = 37,
        game_type_lucky_lion = 38,
        game_type_wucaishen = 39,
        game_type_mjhl = 40,
        game_type_tgpd = 41,
        game_type_bigsmall = 42,
        game_type_longhu = 43,
        game_type_shuangdan = 44,
        game_type_mjhlsecond = 45,
        game_type_dataosha = 46,
        game_type_pdk = 47
    };
    export enum room_type
    {
        room_primary = 1,
        room_intermediate = 2,
        room_senior = 3,
        room_master = 4,
        room_regal = 5
    };
    export enum sex
    {
        man = 1,
        woman = 2
    };
    export enum common_game_result
    {
        win = 1,
        lost = 2,
        tie = 3
    };
    export enum award_type
    {
        day_task = 1,
        achievements_task = 2,
        welfare_gift = 3
    };
    export enum transfer_log_type
    {
        transfer_log_type_in = 1,
        transfer_log_type_out = 2
    };
    export enum zjh_card_type
    {
        zjh_three_kind = 1,
        zjh_straight_flush = 2,
        zjh_flush = 3,
        zjh_straight = 4,
        zjh_pair = 5,
        zjh_normal = 6
    };
    export enum zjh_game_status
    {
        zjh_game_status_idle = 1,
        zjh_game_status_gaming = 2,
        zjh_game_status_allin = 3,
        zjh_game_status_settlement = 4
    };
    export enum zjh_role_status
    {
        zjh_role_status_idle = 1,
        zjh_role_status_prepared = 2,
        zjh_role_status_gaming = 3
    };
    export enum role_prepare_action
    {
        prepare_action_do = 1,
        prepare_action_undo = 2
    };
    export enum shz_bibei_bet
    {
        shz_bibei_bet_minus = 1,
        shz_bibei_bet_normal = 2,
        shz_bibei_bet_plus = 3
    };
    export enum shz_bibei_dice
    {
        shz_bibei_dice_small = 1,
        shz_bibei_dice_medium = 2,
        shz_bibei_dice_big = 3
    };
    export enum dn_game_status
    {
        dn_game_status_idle = 1,
        dn_game_compete_banker = 2,
        dn_game_bet_times = 3,
        dn_game_select_cards = 4,
        dn_game_status_settlement = 5
    };
    export enum dn_role_status
    {
        dn_role_status_idle = 1,
        dn_role_status_prepared = 2,
        dn_role_status_robing = 3,
        dn_role_status_beting_times = 4,
        dn_role_status_unselected = 5,
        dn_role_status_selected = 6
    };
    export enum dn_card_type
    {
        dn_mini = 1,
        dn_bomb = 2,
        dn_five_flower = 3,
        dn_niuniu = 4,
        dn_niu_nine = 5,
        dn_niu_eight = 6,
        dn_niu_seven = 7,
        dn_niu_six = 8,
        dn_niu_five = 9,
        dn_niu_four = 10,
        dn_niu_three = 11,
        dn_niu_two = 12,
        dn_niu_one = 13,
        dn_normal = 14
    };
    export enum dot21_game_status
    {
        dot21_game_status_idle = 1,
        dot21_game_status_buying_insurance = 2,
        dot21_game_status_operator = 3,
        dot21_game_status_banker = 4
    };
    export enum dot21_role_status
    {
        dot21_role_status_idle = 1,
        dot21_role_status_beting = 2,
        dot21_role_status_buying_insurance = 3,
        dot21_role_status_getting_card = 4,
        dot21_role_status_wating = 5
    };
    export enum niu100_game_status
    {
        niu100_game_status_start_counting = 1,
        niu100_game_status_beting = 2,
        niu100_game_status_comparing = 3
    };
    export enum bjl_game_status
    {
        bjl_game_status_start_counting = 1,
        bjl_game_status_beting = 2,
        bjl_game_status_comparing = 3
    };
    export enum bjl_pool
    {
        bjl_pool_player = 1,
        bjl_pool_banker = 2,
        bjl_pool_tie = 3,
        bjl_pool_player_king = 4,
        bjl_pool_banker_king = 5
    };
    export enum texas_card_type
    {
        texas_three_kind = 1,
        texas_straight_flush = 2,
        texas_flush = 3,
        texas_straight = 4,
        texas_pair = 5,
        texas_normal = 6
    };
    export enum texas_game_status
    {
        texas_game_status_idle = 1,
        texas_game_status_gaming = 2,
        texas_game_status_allin = 3
    };
    export enum texas_role_status
    {
        texas_role_status_idle = 1,
        texas_role_status_prepared = 2,
        texas_role_status_gaming = 3
    };
    export enum bmw_game_status
    {
        bmw_game_status_start_counting = 1,
        bmw_game_status_beting = 2,
        bmw_game_status_comparing = 3
    };
    export enum fqzs_game_status
    {
        fqzs_game_status_start_counting = 1,
        fqzs_game_status_beting = 2,
        fqzs_game_status_comparing = 3
    };
    export enum zjh100_game_status
    {
        zjh100_game_status_start_counting = 1,
        zjh100_game_status_beting = 2,
        zjh100_game_status_comparing = 3
    };
    export enum laba_icon_type
    {
        laba_icon_single_seven = 1,
        laba_icon_double_seven = 2,
        laba_icon_three_seven = 3,
        laba_icon_three_bar = 4,
        laba_icon_fangkuai = 5,
        laba_icon_hua = 6,
        laba_icon_xin = 7,
        laba_icon_tao = 8,
        laba_icon_wild = 9,
        laba_icon_bonus = 10
    };

    export function get_proto_version()
    {

        return 1;
    }

}