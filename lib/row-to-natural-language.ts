export function rowToSentence(row: any) {
    return `IPL match in ${row.season} on ${row.date} at ${row.venue} in ${row.city}. 
  ${row.team1} played against ${row.team2}. 
  ${row.toss_winner} won the toss and chose to ${row.toss_decision}. 
  ${row.winner} won the match by ${row.result_margin} ${row.result}. 
  Player of the match was ${row.player_of_match}.`;
  }