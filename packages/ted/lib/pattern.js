/**
 * Regex for parsing TED URLs
 * 
 * Notable points:
 * 
 * Embeddable videos are always children of the `/talks/*` path.
 * 
 * When navigating within the TED site, some links have `/c` dynamically
 * appended, which seem to be for attribution and tracking purposes.
 * This pattern strips out that last `/` and everything after it. This
 * saves having to sanitize the URL later, becauase including the trailing
 * `/c` on an embed.ted.com URL breaks the embed. Annoying!
 * Example: `/talks/x_y_z/c` will always be returned as `/talks/x_y_z`.
 * 
 * Video URLs are slugified with underscores. Relevant edge cases:
 * - Numerals: https://www.ted.com/talks/ted_ed_3_ways_to_end_a_virus
 * - Hyphens: https://www.ted.com/talks/olivia_vinckier_a_colorful_case_for_outside_the_box_thinking_on_identity
 * - Square brackets: https://www.ted.com/talks/ted_countdown_ted_countdown_dilemma_series_carbon_credits_session_2
 * - Quotation marks and backslashes: https://www.ted.com/talks/blinky_bill_kilamu_ama_aje_jam_now_simmer_down_dracula
 * - Double-hyphens and apostrophes: https://www.ted.com/talks/jen_gunter_how_vaccines_are_developed_and_why_they_re_safe
 * - Parentheses: https://www.ted.com/talks/nithya_vaduganathan_5_hiring_tips_every_company_and_job_seeker_should_know
 * - Question marks: https://www.ted.com/talks/raymond_adkins_how_do_airplanes_stay_in_the_air
 * - Colons: https://www.ted.com/talks/cameron_sinclair_my_wish_a_call_for_open_source_architecture
 * 
 * The numbered capture groups are required for mimicking atomic groups
 * in Javascript. See: https://blog.stevenlevithan.com/archives/mimic-atomic-groups
 * 
 * 1. Arbitrary whitespace
 * 2. Arbitrary whitespace
 * 3. The URL. It won't include anything after a trailing '/' character.
 * 4. Arbitrary whitespace
 * 5. Arbitrary whitespace 
 */

module.exports = /<p>(?=(\s*))\1(?:<a [^>]*?>)??(?=(\s*))\2((?:https?:)??(?:\/\/)??(?:w{3}\.)??(?:ted\.com\/talks\/[0-9a-zA-Z_]+))(?:\/?[^\s<>]*?)??(?=(\s*))\4(?:<\/a>)??(?=(\s*))\5<\/p>/g