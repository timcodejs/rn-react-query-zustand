//
//  MessLiveActivity.swift
//  MessLiveActivity
//
//  Created by Tim Lee on 2/10/24.
//

import WidgetKit
import SwiftUI

public struct TodoModel:Codable {
  let id: Int, title: String;
}

struct Provider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      SimpleEntry(todos: [], date: Date(), configuration: ConfigurationAppIntent())
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
        SimpleEntry(todos: [], date: Date(), configuration: configuration)
    }
    
    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
        var entries: [SimpleEntry] = []
      
        let userDefaults = UserDefaults(suiteName: "group.com.mass.project.widget")
        let jsonText = userDefaults?.string(forKey: "data")
      
        var todos : [TodoModel] = []

        do {
          if jsonText != nil {
            let jsonData = Data(jsonText?.utf8 ?? "".utf8)
            let valueData = try JSONDecoder().decode([TodoModel].self, from: jsonData)
            todos = valueData
          }
        } catch {
          print(error)
        }
      
        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(todos: todos, date: entryDate, configuration: configuration)
            entries.append(entry)
        }

        return Timeline(entries: entries, policy: .atEnd)
    }
}

struct SimpleEntry: TimelineEntry {
    let todos: [TodoModel]
    let date: Date
    let configuration: ConfigurationAppIntent
}

struct MessLiveActivityEntryView : View {
    var entry: Provider.Entry

    var body: some View {
      HStack(alignment: .top, spacing: nil, content: {
        VStack(alignment: .center, spacing: nil, content: {
          Text("⭐️ 할 일 목록 ⭐️").bold().padding(.bottom, 5)
          Text(entry.configuration.favoriteEmoji).font(Font.system(size: 70)).padding(.top, 5)
        })
        VStack(alignment: .leading, spacing: nil, content: {
          ForEach(Array(zip(entry.todos.indices, entry.todos)), id: \.0) { index, item in
            if index < 5 {
              Text("\(item.id). \(item.title)")
                .frame(maxWidth: .infinity)
            }
          }
          .padding(1)
          .cornerRadius(5)
          .background(Color(red: 249 / 255, green: 223 / 255, blue: 159 / 255))
        })
      })
    }
}

struct MessLiveActivity: Widget {
    let kind: String = "MessLiveActivity"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
            MessLiveActivityEntryView(entry: entry)
                .containerBackground(Color(red: 251 / 255, green: 236 / 255, blue: 197 / 255), for: .widget)
        }
    }
}

extension ConfigurationAppIntent {
    fileprivate static var smiley: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.favoriteEmoji = "😀"
        return intent
    }
    
    fileprivate static var starEyes: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.favoriteEmoji = "🤩"
        return intent
    }
}

#Preview(as: .systemSmall) {
    MessLiveActivity()
} timeline: {
    SimpleEntry(todos: [], date: .now, configuration: .smiley)
    SimpleEntry(todos: [], date: .now, configuration: .starEyes)
}
