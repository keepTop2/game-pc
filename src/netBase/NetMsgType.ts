export module NetMsgType {
    const msgType1 = {
        msg_req_check_version: 1,
        msg_stime: 2,
        msg_common_good: 3,
        msg_req_role_login: 4,
        msg_notify_login_result: 5,
        msg_notify_check_version: 6,
        msg_req_login_check: 7,
        msg_notify_login_check_result: 8,
        msg_notify_loading_end: 9,
        msg_notify_sys_msg: 10,
        msg_pack_item: 11,
        msg_game_record_item: 12,
        msg_req_recharge: 13,
        msg_req_buy_mooncard: 14,
        msg_req_convert_cdkey: 15,
        msg_award_item: 16,
        msg_award_info: 17,
        msg_notify_heartbeat: 18,
        msg_req_check_time: 19,
        msg_notify_check_time: 20,
        msg_notify_repeat_login: 21,
        msg_cur_rec: 22,
        msg_req_create_role: 23,
        msg_notify_create_role_result: 24,
        msg_req_role_info_msg: 25,
        msg_notify_roleinfo_msg: 26,
        msg_req_roleinfo_with_id: 27,
        msg_notify_roleinfo_with_id: 28,
        msg_req_game_reconnect: 29,
        msg_notify_reconnect_result: 30,
        msg_notify_money_update: 31,
        msg_req_rename: 32,
        msg_notify_rename_result: 33,
        msg_req_select_head_icon: 34,
        msg_notify_select_head_icon_result: 35,
        msg_req_update_sex: 36,
        msg_notify_update_sex_result: 37,
        msg_req_update_signature: 38,
        msg_notify_update_signature_result: 39,
        msg_req_update_auto: 40,
        msg_notify_update_auto: 41,
        msg_req_get_weixin_id: 42,
        msg_notify_get_weixin_id_result: 43,
        msg_req_update_weixin_id: 44,
        msg_notify_update_weixin_id_result: 45,
        msg_req_set_bank_password: 46,
        msg_notify_set_bank_password_result: 47,
        msg_req_reset_bank_password: 48,
        msg_notify_reset_bank_password_result: 49,
        msg_req_get_bank_password: 50,
        msg_notify_get_bank_password_result: 51,
        msg_req_set_mobile_apply: 52,
        msg_notify_set_mobile_apply_result: 53,
        msg_req_set_mobile: 54,
        msg_notify_set_mobile_result: 55,
        msg_req_auth_bank_password: 56,
        msg_notify_auth_bank_password_result: 57,
        msg_req_bank_save: 58,
        msg_notify_bank_save_result: 59,
        msg_req_bank_take: 60,
        msg_notify_bank_take_result: 61,
        msg_req_bank_transfer_apply: 62,
        msg_notify_bank_transfer_apply_result: 63,
        msg_req_bank_transfer_confirm: 64,
        msg_notify_bank_transfer_confirm_result: 65,
        msg_transfer_log: 66,
        msg_req_bank_transfer_log: 67,
        msg_notify_bank_transfer_log: 68,
        msg_req_bank_money_refresh: 69,
        msg_notify_bank_money_refresh: 70,
        msg_agent_item: 71,
        msg_req_agent_list: 72,
        msg_notify_agent_list: 73,
        msg_rank_item: 74,
        msg_req_rank_list: 75,
        msg_notify_rank_list: 76,
        msg_email: 77,
        msg_notify_email_list: 78,
        msg_req_get_email_attachments: 79,
        msg_notify_get_email_attachments: 80,
        msg_notify_new_email: 81,
        msg_req_read_email: 82,
        msg_notify_read_email: 83,
        msg_req_add_money: 84,
        msg_req_reduce_money: 85,
        msg_req_pay_reward: 86,
        msg_notify_pay_reward: 87,
        msg_req_gm_run: 88,
        msg_award_state: 89,
        msg_req_day_task: 90,
        msg_task_msg: 91,
        msg_notify_day_task: 92,
        msg_notify_day_task_state: 93,
        msg_req_get_reward: 94,
        msg_notify_get_reward: 95,
        msg_req_get_login_award: 96,
        msg_notify_get_login_award: 97,
        msg_req_get_sign_award: 98,
        msg_notify_get_sign_award: 99,
        msg_req_weixin_share_task_finish: 100,
        msg_notify_weixin_share_task_finish: 101,
        msg_shz_item: 102,
        msg_req_shz_lottery: 103,
        msg_notify_shz_lottery_result: 104,
        msg_req_shz_bibei: 105,
        msg_notify_shz_bibei_result: 106,
        msg_req_shz_mali: 107,
        msg_notify_shz_mali_result: 108,
        msg_room_table: 109,
        msg_req_table_list: 110,
        msg_notify_table_list: 111,
        msg_room_msg_kv: 112,
        msg_room_role_base: 113,
        msg_req_leave_room: 114,
        msg_notify_leave_room_result: 115,
        msg_notify_leave_room: 116,
        msg_req_leave_minigame_room: 117,
        msg_notify_leave_minigame_room_result: 118,
        msg_notify_room_msg: 119,
        msg_req_enter_room: 120,
        msg_notify_enter_room_result: 121,
        msg_req_enter_room_with_room_id: 122,
        msg_notify_room_with_room_id_result: 123,
        msg_req_change_room: 124,
        msg_notify_change_room_result: 125,
        msg_notify_role_enter: 126,
        msg_notify_role_prepare: 127,
        msg_room_role_money: 128,
        msg_notify_room_roles_money: 129,
        msg_role_get_money_item: 130,
        msg_zjh_card_item: 131,
        msg_zjh_role_item: 132,
        msg_zjh_game_role_info: 133,
        msg_req_zjh_prepare: 134,
        msg_req_zjh_allin: 135,
        msg_req_zjh_see_cards: 136,
        msg_req_zjh_apply_compare: 137,
        msg_req_zjh_compare_role: 138,
        msg_req_zjh_follow: 139,
        msg_req_zjh_add_bet: 140,
        msg_req_zjh_give_up: 141,
        msg_notify_zjh_card_item: 142,
        msg_notify_zjh_room_info: 143,
        msg_notify_zjh_game_start: 144,
        msg_notify_zjh_round_update: 145,
        msg_notify_zjh_see_cards: 146,
        msg_notify_zjh_start_counting: 147,
        msg_notify_zjh_allin: 148,
        msg_notify_zjh_apply_compare: 149,
        msg_notify_zjh_compare: 150,
        msg_notify_zjh_follow: 151,
        msg_notify_zjh_add_bet: 152,
        msg_notify_zjh_give_up: 153,
        msg_notify_zjh_operator_role: 154,
        msg_zjh_settlement_item: 155,
        msg_notify_zjh_settlement: 156,
        msg_dn_card_item: 157,
        msg_dn_role_item: 158,
        msg_dn_game_role_info: 159,
        msg_notify_dn_room_info: 160,
        msg_req_dn_prepare: 161,
        msg_notify_dn_start_counting: 162,
        msg_notify_dn_game_start: 163,
        msg_notify_dn_show_card: 164,
        msg_req_dn_rob_banker: 165,
        msg_notify_dn_rob_banker: 166,
        msg_notify_dn_rob_banker_result: 167,
        msg_req_dn_bet_times: 168,
        msg_notify_dn_bet_times: 169,
        msg_notify_dn_all_cards: 170,
        msg_notify_dn_select_cards_start: 171,
        msg_req_dn_select_cards: 172,
        msg_notify_dn_select_cards: 173,
        msg_dn_settlement_item: 174,
        msg_notify_dn_settlement: 175,
        msg_dot21_card_item: 176,
        msg_dot21_role_item: 177,
        msg_dot21_game_role_info: 178,
        msg_notify_dot21_room_info: 179,
        msg_notify_dot21_start_counting: 180,
        msg_req_dot21_bet: 181,
        msg_notify_dot21_bet: 182,
        msg_dot21_role_with_card: 183,
        msg_notify_dot21_game_start: 184,
        msg_req_dot21_buy_insurance: 185,
        msg_notify_dot21_buy_insurance: 186,
        msg_req_dot21_divide_card: 187,
        msg_notify_dot21_divide_card: 188,
        msg_req_dot21_get_card: 189,
        msg_notify_dot21_get_card: 190,
        msg_req_dot21_stop_card: 191,
        msg_notify_dot21_stop_card: 192,
        msg_req_dot21_double_card: 193,
        msg_notify_dot21_double_card: 194,
        msg_notify_dot21_banker_first_card: 195,
        msg_notify_dot21_banker_all_cards: 196,
        msg_dot21_settlement_item: 197,
        msg_notify_buy_insurance_settlement: 198,
        msg_notify_dot21_settlement: 199,
        msg_niu100_pool_info_item: 200,
        msg_niu100_history_item: 201,
        msg_notify_niu100_room_info: 202,
        msg_notify_niu100_start_counting: 203,
        msg_notify_niu100_start_beting: 204,
        msg_niu100_settlement_item: 205,
        msg_notify_niu100_myself_get_money: 206,
        msg_notify_niu100_start_comparing: 207,
        msg_niu100_bet_item: 208,
        msg_req_niu100_bet: 209,
        msg_notify_niu100_self_bet: 210,
        msg_notify_niu100_bet: 211,
        msg_req_niu100_banker_list: 212,
        msg_notify_niu100_banker_list: 213,
        msg_req_niu100_banker_in: 214,
        msg_notify_niu100_banker_in: 215,
        msg_req_niu100_banker_out: 216,
        msg_notify_niu100_banker_out: 217,
        msg_notify_niu100_cur_banker: 218,
        msg_bjl_pool_info_item: 219,
        msg_bjl_history_item: 220,
        msg_bjl_history_point_item: 221,
        msg_notify_bjl_room_info: 222,
        msg_notify_bjl_start_counting: 223,
        msg_notify_bjl_start_beting: 224,
        msg_bjl_settlement_item: 225,
        msg_notify_bjl_myself_get_money: 226,
        msg_notify_bjl_start_comparing: 227,
        msg_bjl_bet_item: 228,
        msg_req_bjl_bet: 229,
        msg_notify_bjl_self_bet: 230,
        msg_notify_bjl_bet: 231,
        msg_req_bjl_banker_list: 232,
        msg_notify_bjl_banker_list: 233,
        msg_req_bjl_banker_in: 234,
        msg_notify_bjl_banker_in: 235,
        msg_req_bjl_banker_out: 236,
        msg_notify_bjl_banker_out: 237,
        msg_notify_bjl_cur_banker: 238,
        msg_bullet_item: 239,
        msg_cannon_item: 240,
        msg_buyu_fish_item: 241,
        msg_notify_buyu_room_info: 242,
        msg_req_buyu_shoot: 243,
        msg_notify_buyu_shoot: 244,
        msg_req_buyu_update_cannon_times: 245,
        msg_notify_buyu_update_cannon_times: 246,
        msg_req_buyu_hit_fish: 247,
        msg_notify_buyu_hit_fish: 248,
        msg_notify_buyu_fish_spawn: 249,
        msg_notify_buyu_change_map: 250,
        msg_req_buyu_target_fish: 251,
        msg_notify_buyu_target_fish: 252,
        msg_texas_role_item: 253,
        msg_texas_game_role_info: 254,
        msg_req_texas_prepare: 255,
        msg_req_texas_allin: 256,
        msg_req_texas_see_cards: 257,
        msg_req_texas_apply_compare: 258,
        msg_req_texas_compare_role: 259,
        msg_req_texas_follow: 260,
        msg_req_texas_add_bet: 261,
        msg_req_texas_give_up: 262,
        msg_texas_card_item: 263,
        msg_notify_texas_card_item: 264,
        msg_notify_texas_room_info: 265,
        msg_notify_texas_game_start: 266,
        msg_notify_texas_round_update: 267,
        msg_notify_texas_see_cards: 268,
        msg_notify_texas_start_counting: 269,
        msg_notify_texas_allin: 270,
        msg_notify_texas_apply_compare: 271,
        msg_notify_texas_compare: 272,
        msg_notify_texas_follow: 273,
        msg_notify_texas_add_bet: 274,
        msg_notify_texas_give_up: 275,
        msg_texas_settlement_item: 276,
        msg_notify_texas_settlement: 277,
        msg_scratch_item: 278,
        msg_req_scratch_ticket: 279,
        msg_notify_scratch_ticket: 280,
        msg_req_odd_monkey: 281,
        msg_notify_odd_monkey: 282,
        msg_notify_odd_monkey_jackpot: 283,
        msg_bmw_pool_info_item: 284,
        msg_notify_bmw_room_info: 285,
        msg_notify_bmw_start_counting: 286,
        msg_notify_bmw_start_beting: 287,
        msg_notify_bmw_myself_get_money: 288,
        msg_bmw_win_rank_item: 289,
        msg_notify_bmw_start_comparing: 290,
        msg_bmw_bet_item: 291,
        msg_req_bmw_bet: 292,
        msg_notify_bmw_self_bet: 293,
        msg_notify_bmw_bet: 294,
        msg_req_bmw_banker_list: 295,
        msg_notify_bmw_banker_list: 296,
        msg_req_bmw_banker_in: 297,
        msg_notify_bmw_banker_in: 298,
        msg_req_bmw_banker_out: 299,
        msg_notify_bmw_banker_out: 300,
        msg_notify_bmw_cur_banker: 301,
        msg_req_lhdb: 302,
        msg_notify_lhdb: 303,
        msg_notify_lhdb_jackpot: 304,
        msg_req_lhdb_game_save: 305,
        msg_notify_lhdb_game_save: 306,
        msg_notify_lhdb_game_info: 307,
        msg_req_dragon_ball: 308,
        msg_notify_dragon_ball: 309,
        msg_req_huj5: 310,
        msg_notify_huj5: 311,
        msg_notify_huj5_jackpot: 312,
        msg_req_return_money_info: 313,
        msg_notify_return_money_info: 314,
        msg_req_get_return_money: 315,
        msg_notify_get_return_money: 316,
        msg_zjh100_pool_info_item: 317,
        msg_zjh100_history_item: 318,
        msg_notify_zjh100_room_info: 319,
        msg_notify_zjh100_start_counting: 320,
        msg_notify_zjh100_start_beting: 321,
        msg_zjh100_settlement_item: 322,
        msg_notify_zjh100_myself_get_money: 323,
        msg_notify_zjh100_start_comparing: 324,
        msg_zjh100_bet_item: 325,
        msg_req_zjh100_bet: 326,
        msg_notify_zjh100_self_bet: 327,
        msg_notify_zjh100_bet: 328,
        msg_req_zjh100_banker_list: 329,
        msg_notify_zjh100_banker_list: 330,
        msg_req_zjh100_banker_in: 331,
        msg_notify_zjh100_banker_in: 332,
        msg_req_zjh100_banker_out: 333,
        msg_notify_zjh100_banker_out: 334,
        msg_notify_zjh100_cur_banker: 335,
        msg_req_mobile_cancel: 336,
        msg_notify_mobile_cancel: 337,
        msg_laba_item: 338,
        msg_notify_laba_room_info: 339,
        msg_req_laba: 340,
        msg_notify_laba: 341,
        msg_req_slots_info: 342,
        msg_notify_slots_info: 343,
        msg_req_spin: 344,
        msg_msg_kv: 345,
        msg_line_item: 346,
        msg_notify_spin_result: 347,
        msg_slots_open_box: 348,
        msg_notify_slots_open_box: 349,
        msg_req_jincan_update_cannon_times: 350,
        msg_notify_jincan_update_cannon_times: 351,
        msg_req_jincan_hit_fish: 352,
        msg_notify_jincan_hit_fish: 353,
        msg_notify_jincan_banker_money: 354,
        msg_req_pt888_info: 355,
        msg_notify_pt888_info: 356,
        msg_req_pt888_spin: 357,
        msg_notify_pt888_spin: 358,
        msg_req_pt888_take_coin: 359,
        msg_notify_pt888_take_coin: 360,
        msg_notify_pt888_jackpot: 361,
        msg_req_pt888_get_self_record: 362,
        msg_notify_pt888_get_self_record: 363,
        msg_req_pt888_get_all_record: 364,
        msg_notify_pt888_get_all_record: 365,
        msg_req_suggest: 366,
        msg_notify_suggest: 367,
        msg_req_pt888_acc_win: 368,
        msg_notify_pt888_acc_win: 369,
        msg_req_jmp_info: 370,
        msg_notify_jmp_info: 371,
        msg_req_jmp_spin: 372,
        msg_notify_jmp_spin_result: 373,
        msg_req_qtds_info: 374,
        msg_notify_qtds_info: 375,
        msg_req_qtds_spin: 376,
        msg_notify_qtds_spin_result: 377,
        msg_req_qtds_free_spin: 378,
        msg_notify_qtds_free_spin_result: 379,
        msg_req_qtds_free_detail: 380,
        msg_notify_qtds_free_detail_result: 381,
        msg_req_recommend_role: 382,
        msg_notify_recommend_role: 383,
        msg_req_yiyuan_buy: 384,
        msg_notify_yiyuan_buy: 385,
        msg_req_yiyuan_history: 386,
        msg_yiyuan_history_item: 387,
        msg_notify_yiyuan_history: 388,
        msg_req_yiyuan_self_history: 389,
        msg_self_history_item: 390,
        msg_notify_yiyuan_self_history: 391,
        msg_notify_yiyuan_broadcast_round: 392,
        msg_notify_yiyuan_broadcast_lottery: 393,
        msg_item_info: 394,
        msg_req_zhuanpan_info: 395,
        msg_notify_zhuanpan_info: 396,
        msg_req_zhuanpan_start: 397,
        msg_notify_zhuanpan_reward: 398,
        msg_req_help_money_info: 399,
        msg_notify_help_money_info: 400,
        msg_req_help_money_draw: 401,
        msg_notify_help_money_draw: 402,
        msg_game_task_data: 403,
        msg_req_game_task_list: 404,
        msg_notify_game_task_list: 405,
        msg_req_game_task_draw: 406,
        msg_notify_game_task_draw: 407,
        msg_wx_share_req: 408,
        msg_notify_wx_share: 409,
        msg_req_role_login_with_ip: 410,
        msg_req_role_return_money_info: 411,
        msg_notify_role_return_money_info: 412,
        msg_req_get_role_return_money: 413,
        msg_notify_get_role_return_money: 414,
        msg_req_weixin_daily_give_info: 415,
        msg_notify_weixin_daily_give_info: 416,
        msg_req_weixin_daily_give: 417,
        msg_notify_weixin_daily_give: 418,
        msg_req_update_account_verify_code: 419,
        msg_notify_update_account_verify_code: 420,
        msg_req_update_account: 421,
        msg_notify_update_account: 422,
        msg_req_invite_time_out: 423,
        msg_notify_invite_time_out: 424,
        msg_sign_in_cfg: 425,
        msg_req_sign_in_config: 426,
        msg_notify_sign_in_list: 427,
        msg_req_sign_in: 428,
        msg_notify_sign_in: 429,
        msg_notify_buyu_shoot_list: 430,
        msg_req_gif: 431,
        msg_req_whether_can_open_red_packet: 432,
        msg_notify_whether_can_open_red_packet: 433,
        msg_req_open_red_packet: 434,
        msg_notify_open_red_packet: 435,
        msg_req_dcdf_info: 436,
        msg_notify_dcdf_info: 437,
        msg_req_dcdf_spin: 438,
        msg_notify_dcdf_spin_result: 439,
        msg_req_dcdf_free_spin: 440,
        msg_notify_dcdf_free_spin_result: 441,
        msg_req_dcdf_free_detail: 442,
        msg_notify_dcdf_free_detail_result: 443,
        msg_notify_dcdf_prize_pool_refresh: 444,
        msg_req_milu_info: 445,
        msg_notify_milu_info: 446,
        msg_req_milu_spin: 447,
        msg_notify_milu_spin_result: 448,
        msg_notify_spin_result_whiteBones: 449,
        msg_req_dragon_knight_info: 450,
        msg_notify_dragon_knight_info: 451,
        msg_req_dragon_knight_spin: 452,
        msg_notify_dragon_knight_spin_result: 453,
        msg_req_dragon_knight_free_game_select: 454,
        msg_notify_dragon_knight_free_game_select: 455,
        msg_req_dragon_knight_free_game_spin: 456,
        msg_notify_dragon_knight_free_game_spin_result: 457,
        msg_req_dcdf_open_prize: 458,
        msg_notify_dcdf_open_prize_result: 459,
        msg_req_dcdf_open_prize_detail: 460,
        msg_notify_dcdf_open_prize_detail_result: 461,
        msg_req_jump_info: 462,
        msg_notify_jump_info: 463,
        msg_req_jump_spin: 464,
        msg_notify_jump_spin_result: 465,
        msg_req_jump_free_spin: 466,
        msg_notify_jump_free_spin_result: 467,
        msg_req_jump_free_detail: 468,
        msg_notify_jump_free_detail_result: 469,
        msg_rank_item_bet: 470,
        msg_req_rank_bet: 471,
        msg_notify_rank_bet: 472,
        msg_req_rank_getreward: 473,
        msg_notify_rank_getreward: 474,
        msg_req_get_qq: 475,
        msg_notify_get_qq_result: 476,
        msg_req_update_qq: 477,
        msg_notify_update_qq_result: 478,
        msg_req_three_little_pigs_info: 479,
        msg_notify_three_little_pigs_info: 480,
        msg_req_three_little_pigs_spin: 481,
        msg_notify_three_little_pigs_spin_result: 482,
        msg_req_three_little_pigs_free_game_spin: 483,
        msg_notify_three_little_pigs_free_game_spin_result: 484,
        msg_fruit_mali_line_item: 485,
        msg_req_fruit_mali_info: 486,
        msg_notify_fruit_mali_info: 487,
        msg_notify_fruit_mali_jackpot: 488,
        msg_req_fruit_mali_lottery: 489,
        msg_notify_fruit_mali_lottery_result: 490,
        msg_req_fruit_mali_mali: 491,
        msg_notify_fruit_mali_mali_result: 492,
        msg_req_fruit_mali_mali_finish: 493,
        msg_fqzs_pool_info_item: 494,
        msg_notify_fqzs_room_info: 495,
        msg_notify_fqzs_start_counting: 496,
        msg_notify_fqzs_start_beting: 497,
        msg_notify_fqzs_myself_get_money: 498,
        msg_fqzs_win_rank_item: 499,
        msg_notify_fqzs_start_comparing: 500,
        msg_fqzs_bet_item: 501,
        msg_req_fqzs_bet: 502,
        msg_notify_fqzs_self_bet: 503,
        msg_notify_fqzs_bet: 504,
        msg_req_fqzs_banker_list: 505,
        msg_notify_fqzs_banker_list: 506,
        msg_req_fqzs_banker_in: 507,
        msg_notify_fqzs_banker_in: 508,
        msg_req_fqzs_banker_out: 509,
        msg_notify_fqzs_banker_out: 510,
        msg_notify_fqzs_cur_banker: 511,
        msg_notify_fqzs_bank_list_have_real_player: 512,
        msg_req_milu2_info: 513,
        msg_notify_milu2_info: 514,
        msg_req_milu2_spin: 515,
        msg_notify_milu2_spin_result: 516,
        msg_nine_line_line_item: 517,
        msg_req_nine_line_info: 518,
        msg_notify_nine_line_info: 519,
        msg_notify_nine_line_jackpot: 520,
        msg_req_nine_line_lottery: 521,
        msg_notify_nine_line_lottery_result: 522,
        msg_rebate_item_bet: 523,
        msg_req_bet_rebate: 524,
        msg_notify_bet_rebate: 525,
        msg_req_rebate_getreward: 526,
        msg_notify_rebate_getreward: 527,
        msg_rebate_all_item_bet: 528,
        msg_rebate_to_date: 529,
        msg_rebate_benefit_status: 530,
        msg_req_bet_rebate_all_info: 531,
        msg_notify_bet_rebate_all_info: 532,
        msg_req_bet_rebate_all_details: 533,
        msg_notify_bet_rebate_all_details: 534,
        msg_req_rebate_all_getreward: 535,
        msg_notify_rebate_all_getreward: 536,
        msg_vip_reward_status: 537,
        msg_vip_level_config: 538,
        msg_req_vip_info: 539,
        msg_notify_vip_info: 540,
        msg_req_vip_claim_promotional_reward: 541,
        msg_req_vip_claim_gift_money: 542,
        msg_req_vip_claim_holiday_reward: 543,
        msg_req_vip_claim_mysterious_reward: 544,
        msg_notify_vip_claim_status: 545,
        msg_req_vip_level: 546,
        msg_notify_vip_level: 547,
        msg_new_rank_item: 548,
        msg_req_new_rank_list: 549,
        msg_notify_new_rank_list: 550,
        msg_bank_card_info: 551,
        msg_req_bank_card_info_list: 552,
        msg_notify_bank_card_info_list: 553,
        msg_req_new_bank_card_info: 554,
        msg_notify_req_new_bank_card_info: 555,
        msg_bank_info: 556,
        msg_req_bank_name_list: 557,
        msg_notify_req_bank_name_list: 558,
        msg_recharge_record: 559,
        msg_withdraw_record: 560,
        msg_req_get_recharge_record_list: 561,
        msg_notify_get_recharge_record_list: 562,
        msg_req_apply_withdraw: 563,
        msg_notify_apply_withdraw: 564,
        msg_req_cancel_apply_withdraw: 565,
        msg_notify_cancel_apply_withdraw: 566,
        msg_req_get_withdraw_record_list: 567,
        msg_notify_get_withdraw_record_list: 568,
        msg_req_get_accounting_change_record_list: 569,
        msg_accounting_change_record: 570,
        msg_notify_get_accounting_change_record_list: 571,
        msg_req_captain_info: 572,
        msg_notify_captain_info: 573,
        msg_req_captain_spin: 574,
        msg_notify_captain_spin_result: 575,
        msg_gfxm_symbol_item: 576,
        msg_req_gfxm_info: 577,
        msg_notify_gfxm_info: 578,
        msg_req_gfxm_spin: 579,
        msg_notify_gfxm_spin_result: 580,
        msg_lucky_lion_line_item: 581,
        msg_lucky_lion_extra_game: 582,
        msg_req_lucky_lion_info: 583,
        msg_notify_lucky_lion_info: 584,
        msg_req_lucky_lion_lottery: 585,
        msg_notify_lucky_lion_lottery_result: 586,
        msg_req_recharge_level_info: 587,
        msg_notify_recharge_level_info: 588,
        msg_req_recharge_level_award: 589,
        msg_notify_recharge_level_award: 590,
        msg_req_recharge_level_day_info: 591,
        msg_notify_recharge_level_day_info: 592,
        msg_req_recharge_level_day_award: 593,
        msg_notify_recharge_level_day_award: 594,
        msg_wucaishen_line_item: 595,
        msg_req_wucaishen_info: 596,
        msg_notify_wucaishen_info: 597,
        msg_notify_wucaishen_jackpot: 598,
        msg_req_wucaishen_lottery: 599,
        msg_notify_wucaishen_lottery_result: 600,
        msg_req_buy_vip: 601,
        msg_notify_buy_vip: 602,
        msg_req_get_signin_extra_reward: 603,
        msg_notify_get_signin_extra_reward: 604,
        msg_invite_role_data: 605,
        msg_req_invite_time_out2: 606,
        msg_notify_invite_time_out2: 607,
        msg_req_get_red_point: 608,
        msg_notify_get_red_point: 609,
        msg_req_get_exp_room_time: 610,
        msg_notify_get_exp_room_time: 611,
        msg_req_mjhl_info: 612,
        msg_notify_mjhl_info: 613,
        msg_req_mjhl_spin: 614,
        msg_notify_mjhl_spin_result: 615,
        msg_agent_item2: 616,
        msg_req_agent_list2: 617,
        msg_notify_agent_list2: 618,
        msg_req_code_redeem: 619,
        msg_notify_code_redeem: 620,
        msg_req_need_endless: 621,
        msg_notify_need_endless: 622,
        msg_req_endless_bind: 623,
        msg_notify_endless_bind: 624,
        msg_req_endless_info: 625,
        msg_notify_endless_info: 626,
        msg_req_endless_income_take: 627,
        msg_notify_endless_income_take_result: 628,
        msg_endless_detail: 629,
        msg_req_endless_details: 630,
        msg_notify_endless_details: 631,
        msg_req_svip_signup: 632,
        msg_notify_svip_signup: 633,
        msg_req_svip_info: 634,
        msg_notify_svip_info: 635,
        msg_req_svip_getreawrd: 636,
        msg_notify_svip_getreawrd: 637,
        msg_christmas_rank_data: 638,
        msg_req_christmas_info: 639,
        msg_notify_christmas_info: 640,
        msg_notify_christmas_countdown: 641,
        msg_req_christmas_hit: 642,
        msg_notify_christmas_hit: 643,
        msg_notify_christmas_reward: 644,
        msg_req_voucher_info: 645,
        msg_notify_voucher_info: 646,
        msg_req_get_voucher: 647,
        msg_nodify_get_voucher_result: 648,
        msg_req_free_spell_info: 649,
        msg_nodify_free_spell_info: 650,
        msg_req_get_free_amount: 651,
        msg_nodify_get_free_amount: 652,
        msg_invite_detail: 653,
        msg_free_record_detail: 654,
        msg_req_get_free_record: 655,
        msg_nodify_get_free_record_result: 656,
        msg_req_load_ip: 657,
        msg_nodify_load_id: 658,
        msg_req_login: 659,
        msg_nodify_login: 660,
        msg_req_confirm_agent_level1_transfer: 661,
        msg_nodify_confirm_agent_level1_transfer: 662,
        msg_req_get_agent_lock_bankmoney: 663,
        msg_nodify_get_agent_lock_bankmoney: 664,
        msg_set_newguidestate: 665,
        msg_req_get_config: 666,
        msg_nodify_get_config: 667,
        msg_set_channel: 668,
        msg_set_client_ip: 669,
        msg_req_submit_suggest: 670,
        msg_nodify_submit_suggest: 671,
        msg_req_get_send_sms_check_code: 672,
        msg_nodify_get_send_sms_check_code: 673,
        msg_req_check_sms_code: 674,
        msg_nodify_check_sms_code: 675,
        msg_req_reset_password: 676,
        msg_nodify_reset_password: 677,
        msg_req_get_send_create_user_sms_code: 678,
        msg_nodify_get_send_create_user_sms_code: 679,
        msg_req_add_guest: 680,
        msg_nodify_add_guest: 681,
        msg_req_create_v2: 682,
        msg_nodify_create_v2: 683,
        msg_req_get_mobile_sms_login_code: 684,
        msg_nodify_get_mobile_sms_login_code: 685,
        msg_minigame_rank_item: 686,
        msg_dice_item: 687,
        msg_notify_bigsmall_info: 688,
        msg_notify_bigsmall_stage: 689,
        msg_req_bigsmall_bet: 690,
        msg_notify_bigsmall_self_bet: 691,
        msg_notify_bigsmall_bet: 692,
        msg_req_bigsmall_rank: 693,
        msg_notify_bigsmall_rank: 694,
        msg_req_bigsmall_history: 695,
        msg_notify_bigsmall_history: 696,
        msg_req_bigsmall_trendchart: 697,
        msg_notify_bigsmall_trendchart: 698,
        msg_notify_bettime_bigsmall_to_all: 699,
        msg_minigame_chat_item: 700,
        msg_req_minigame_chat: 701,
        msg_notify_minigame_chat: 702,
        msg_req_get_minigame_chat_record: 703,
        msg_notify_get_minigame_chat_record: 704,
        msg_notify_longhu_info: 705,
        msg_notify_longhu_stage: 706,
        msg_req_longhu_bet: 707,
        msg_notify_longhu_self_bet: 708,
        msg_notify_longhu_bet: 709,
        msg_req_longhu_rank: 710,
        msg_notify_longhu_rank: 711,
        msg_req_longhu_history: 712,
        msg_notify_longhu_history: 713,
        msg_req_longhu_trendchart: 714,
        msg_notify_longhu_trendchart: 715,
        msg_notify_shuangdan_info: 716,
        msg_notify_shuangdan_stage: 717,
        msg_req_shuangdan_bet: 718,
        msg_notify_shuangdan_self_bet: 719,
        msg_notify_shuangdan_bet: 720,
        msg_req_shuangdan_rank: 721,
        msg_notify_shuangdan_rank: 722,
        msg_req_shuangdan_history: 723,
        msg_notify_shuangdan_history: 724,
        msg_lucky_roulette_record: 725,
        msg_req_lucky_roulette_info: 726,
        msg_action_info: 727,
        msg_notify_lucky_roulette_info: 728,
        msg_req_lucky_roulette_start: 729,
        msg_notify_lucky_roulette_reward: 730,
        msg_notify_lucky_roulette_record: 731,
        msg_notify_lucky_roulette_got_chance: 732,
        msg_req_lucky_roulette_latest_record: 733,
        msg_notify_lucky_roulette_latest_record: 734,
        msg_req_3rd_game_login: 735,
        msg_notify_3rd_game_login_result: 736,
        msg_bag_item: 737,
        msg_req_role_bag: 738,
        msg_notify_role_bag: 739,
        msg_req_use_item: 740,
        msg_notify_use_item: 741,
        msg_notify_update_item: 742,
        msg_req_exchange: 743,
        msg_notify_exchange: 744,
        msg_req_first_recharge_info: 745,
        msg_notify_first_recharge_info: 746,
        msg_req_first_recharge_start: 747,
        msg_notify_first_recharge_reward: 748,
        msg_req_first_recharge_show: 749,
        msg_notify_first_recharge_show: 750,
        msg_req_recharge2: 751,
        msg_notify_req_recharge2: 752,
        msg_notify_money_update2: 753,
        msg_req_set_invitecode: 754,
        msg_req_refresh_money: 755,
        msg_req_3rd_game_kick: 756,
        msg_req_rank_with_robot_list: 757,
        msg_notify_rank_with_robot_list: 758,
        msg_recharge_list: 759,
        msg_recharge_discount: 760,
        msg_pay_info: 761,
        msg_req_get_shop_info: 762,
        msg_notify_req_get_shop_info: 763,
        msg_req_recharge_from_third: 764,
        msg_notify_recharge_from_third: 765,
        msg_notify_recharge_success_from_third: 766,
        msg_req_pay_name_list: 767,
        msg_notify_req_pay_name_list: 768,
        msg_req_win_100_history: 769,
        msg_win_100_record: 770,
        msg_win_100_record_with_date: 771,
        msg_notify_win_100_history: 772,
        msg_req_win_100_join: 773,
        msg_win_100_join_record: 774,
        msg_notify_win_100_join: 775,
        msg_req_win_100_info: 776,
        msg_notify_win_100_info: 777,
        msg_req_win_100_share: 778,
        msg_notify_win_100_share: 779,
        msg_req_game_card_leftscore: 780,
        msg_notify_game_card_leftscore: 781,
        msg_req_newbees_info: 782,
        msg_notify_newbees_info: 783,
        msg_req_newbees_prize: 784,
        msg_notify_newbees_prize: 785,
        msg_req_game_giftcard_remainpoints: 786,
        msg_notify_game_giftcard_remainpoints: 787,
        msg_req_register_account: 788,
        msg_notify_register_account: 789,
        msg_req_bind_account: 790,
        msg_notify_bind_account: 791,
        msg_req_customer_info: 792,
        msg_notify_customer_info: 793,
        msg_req_register_captcha: 794,
        msg_notify_register_captcha: 795,
        msg_notify_kickplayer_reason: 796,
        msg_req_recharge_from_third_add: 797,
        msg_req_fllm_reward: 798,
        msg_notify_fllm_reward: 799,
        msg_guaguacard_record: 800,
        msg_watering_record: 801,
        msg_get_water_record: 802,
        msg_tree_upgrade_record: 803,
        msg_req_dragon_fortune_info: 804,
        msg_notify_dragon_fortune_info: 805,
        msg_req_dragon_fortune_open_guaguacard: 806,
        msg_notify_dragon_fortune_open_guaguacard: 807,
        msg_req_dragon_fortune_fertilize_watering: 808,
        msg_notify_dragon_fortune_fertilize_watering: 809,
        msg_req_dragon_fortune_watering_competition: 810,
        msg_notify_dragon_fortune_watering_competition: 811,
        msg_req_dragon_fortune_invite_friend: 812,
        msg_notify_dragon_fortune_invite_friend: 813,
        msg_req_dragon_fortune_get_water_list: 814,
        msg_notify_dragon_fortune_get_water_list: 815,
        msg_req_dragon_fortune_get_water: 816,
        msg_notify_dragon_fortune_get_water: 817,
        msg_req_dragon_fortune_get_fertilizer_list: 818,
        msg_notify_dragon_fortune_get_fertilizer_list: 819,
        msg_req_dragon_fortune_get_fertilizer: 820,
        msg_notify_dragon_fortune_get_fertilizer: 821,
        msg_req_dragon_fortune_invite_friend_get_gift: 822,
        msg_notify_dragon_fortune_invite_friend_get_gift: 823,
        msg_req_dragon_fortune_get_reward: 824,
        msg_notify_dragon_fortune_get_reward: 825,
        msg_req_dragon_fortune_claim_info: 826,
        msg_notify_dragon_fortune_claim_info: 827,
        msg_dataosha_history_100: 828,
        msg_dataosha_history_10: 829,
        msg_dataosha_betchips: 830,
        msg_dataosha_bet_info: 831,
        msg_dataosha_totalbet_info: 832,
        msg_dataosha_gameover_time: 833,
        msg_dataosha_self_record_detail: 834,
        msg_dataosha_self_record: 835,
        msg_req_dataosha_info: 836,
        msg_notify_dataosha_info: 837,
        msg_notify_dataosha_gameover: 838,
        msg_notify_batch_dataosha_stage: 839,
        msg_notify_dataosha_others_enter: 840,
        msg_notify_dataosha_others_leave: 841,
        msg_req_dataosha_bet: 842,
        msg_rsp_dataosha_bet: 843,
        msg_notify_dataosha_others_bet: 844,
        msg_req_dataosha_rank: 845,
        msg_notify_dataosha_rank: 846,
        msg_req_dataosha_history: 847,
        msg_rsp_dataosha_history: 848,
        msg_req_dataosha_seed: 849,
        msg_rsp_dataosha_seed: 850,
        msg_req_dataosha_fair_verify: 851,
        msg_rsp_dataosha_fair_verify: 852,
        msg_req_mjhl2_info: 853,
        msg_notify_mjhl2_info: 854,
        msg_req_mjhl2_spin: 855,
        msg_notify_mjhl2_spin_result: 856,
        msg_req_daily_return_info: 857,
        msg_notify_daily_return_info: 858,
        msg_req_daily_return_claim: 859,
        msg_notify_daily_return_claim: 860,
        msg_daily_return_record: 861,
        msg_req_daily_return_his: 862,
        msg_notify_daily_return_his: 863,
        msg_req_improve_agent_lev: 864,
        msg_notify_improve_agent_lev: 865,
        msg_req_get_email_verification_code: 866,
        msg_notify_get_email_verification_code: 867,
        msg_req_bind_modify_email: 868,
        msg_notify_bind_modify_email: 869,
        msg_req_can_modify_account: 870,
        msg_notify_can_modify_account: 871,
        msg_req_reset_account_password: 872,
        msg_notify_reset_account_password: 873,
        msg_req_open_or_close_withdraw_password: 874,
        msg_notify_open_or_close_withdraw_password: 875,
        msg_req_bind_or_modify_withdraw_password: 876,
        msg_notify_bind_or_modify_withdraw_password: 877,
        msg_bet_record: 878,
        msg_req_get_bet_record_list: 879,
        msg_notify_get_bet_record_list: 880,
        msg_req_get_bet_record_list_by_page: 881,
        msg_notify_get_bet_record_list_by_page: 882,
        msg_req_auto_trans: 883,
        msg_notify_auto_trans: 884,
        msg_req_inner_trans: 885,
        msg_notify_inner_trans: 886,
        msg_req_user_info: 887,
        msg_notify_user_info: 888,
        msg_req_set_default_bankcard: 889,
        msg_notify_set_default_bankcard: 890,
        msg_req_agent_trans: 891,
        msg_notify_agent_trans: 892,
        msg_req_activites: 893,
        msg_activity_info: 894,
        msg_notify_activites: 895,
        msg_req_login_captcha: 896,
        msg_notify_login_captcha: 897,
        msg_req_vip_daily_claim: 898,
        msg_req_get_mobile_sms_code: 899,
        msg_notify_get_mobile_sms_code: 900,
        msg_plat_rec: 901,
        msg_req_platform_gametype_list: 902,
        msg_notify_platform_gametype_list: 903,
        msg_req_get_agent_accounting_change: 904,
        msg_req_get_audit_record: 905,
        msg_audit_record: 906,
        msg_notify_get_audit_record: 907,
        msg_agent_accounting_change_record: 908,
        msg_notify_get_agent_accounting_change: 909,
        msg_notice_record: 910,
        msg_notify_send_system_notice: 911,
        msg_req_can_withdraw: 912,
        msg_notify_can_withdraw: 913,
        msg_req_del_bank_card_info: 914,
        msg_notify_del_bank_card_info: 915,
        msg_req_init_connect: 916,
        msg_req_get_vip_rebate: 917,
        msg_vip_rebate_record: 918,
        msg_notify_get_vip_rebate: 919,
        msg_pdk_user_info: 920,
        msg_req_pdk_info: 921,
        msg_notify_pdk_info: 922,
        msg_req_pdk_ready: 923,
        msg_notify_pdk_start_counting: 924,
        msg_req_pdk_out_card: 925,
        msg_notify_s2c_out_card: 926,
        msg_req_pdk_pass_card: 927,
        msg_notify_s2c_pass_card: 928,
        msg_rsp_pdk_error: 929,
        msg_notify_s2c_game_start: 930,
        msg_notify_s2c_game_over: 931,
        msg_req_pdk_cheat: 932,
        msg_rsp_pdk_cheat: 933,
        msg_req_add_usdt_info: 934,
        msg_notify_add_usdt_info: 935,
        msg_usdt_info: 936,
        msg_req_usdt_info_list: 937,
        msg_notify_usdt_info_list: 938,
        msg_revenue_ratio: 939,
        msg_req_usdt_and_revenue_ratio: 940,
        msg_notify_usdt_and_revenue_ratio: 941,
        msg_req_withdraw_count: 942,
        msg_nodify_withdraw_count: 943,
        msg_req_del_usdt_info: 944,
        msg_notify_del_usdt_info: 945,
        msg_req_set_default_usdt: 946,
        msg_notify_set_default_usdt: 947,
        msg_req_recent_games: 948,
        msg_notify_recent_games: 949,
        msg_req_discount_details: 950,
        msg_notify_discount_details: 951
    }
    type MsgType = typeof msgType1

    export const msgType: MsgType = msgType1
}