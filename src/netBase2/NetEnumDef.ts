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
    export enum game_status
    {
        game_status_normal = 1,
        game_status_maintenance = 2
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
    export enum role_prepare_action
    {
        prepare_action_do = 1,
        prepare_action_undo = 2
    };

    export function get_proto_version()
    {

        return 1;
    }

}