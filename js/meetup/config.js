var $parameters = {
  group_urlname: "open-data-stl",
  after: "-6m",
  before: "6m",
  _width: 400,
  _height: 290,
  _name: "Group Calendar",
  _description: "Lists recent and upcoming meetups for the specified group. The style is very basic so it can be easily adapted to match your site."
};
var $queries = {
  events: function() { 
    return api_call("/events", {
      after: $parameters.after,
      before: $parameters.before,
      group_urlname: $parameters.group_urlname,
      page: 6,
      desc: true
    });
  },
  groups: function() { 
    return api_call("/groups", {
      group_urlname: $parameters.group_urlname
    });
  }
};
jQuery(function($) {
  target = $("#meetups");
  $.getJSON($queries.groups(), function(data) {
      if (data.results) for (var i in data.results) {
        $("#group_name").text(data.results[i].name)
      }
  });
  $.getJSON($queries.events(), function(data) {
    target.empty();
    if (data.status && data.status.match(/^200/) == null) {
      $("#meetup_listing").empty();
    } else for (var i in data.results.reverse()) {
      ev = data.results[data.results.length - i - 1];
      ds = ev.time.match(/\w+ (\w+) (\d+) (\d+):(\d+):\d+ \w+ (\d+)/)
      year = ds.pop();
      minute = ds.pop();
      hour = ds.pop();
      day = ds.pop();
      month = ds.pop();
      date = month + " " + day + ", " + year + " @ " + hour % 12 + ":" + 
        minute + (hour < 12 ? "am" : "pm");
      div = $('<div></div>');
      div.append($('<h4></h4>').append(ev.name))
      go = $('<div class="date-block-container"></div>').append(date)
      if (ev.status == 'upcoming')
        go.append(' | ')
          .append($('<a target="_TOP" href="' + ev.event_url + '" style="background: red; color: white; text-decoration: none; font-size: smaller; font-weight: bold; padding: .3em .5em; border: white; -webkit-border-radius: .3em; -moz-border-radius: .3em"></a>')
            .append("RSVP")
          );
      target.append(div.append(go));
    };
  });
});