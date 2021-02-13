const nestStatsUnderPlayer = (stat) => {
  let player = stat.player
  player.stats = {
    id: stat.id,
    games_played: stat.games_played,
    season: stat.season,
    min: stat.min,
    fgm: stat.fgm,
    fga: stat.fga,
    fg3m: stat.fg3m,
    fg3a: stat.fg3a,
    ftm: stat.ftm,
    fta: stat.fta,
    oreb: stat.oreb,
    dreb: stat.dreb,
    reb: stat.reb,
    ast: stat.ast,
    stl: stat.stl,
    blk: stat.blk,
    turnover: stat.turnover,
    pf: stat.pf,
    pts: stat.pts,
    fg_pct: stat.fg_pct,
    fg3_pct: stat.fg3_pct,
    ft_pct: stat.ft_pct,
  }

  return player
}

export default nestStatsUnderPlayer